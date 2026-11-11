/**
 * Configuración de Socket.IO - Gestiona conexiones WebSocket en tiempo real
 */
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import User from '../models/User.js';
import TherapeuticRecord from '../models/TherapeuticRecord.js';
import memoryService from '../services/memoryService.js';
import { buildHistoryForPromptFromMessages } from '../services/openai/openaiPromptBuilder.js';
import { analyzeConversationPattern } from '../services/chat/conversationPatternAnalyzer.js';
import {
  assessConversationProgressionStructure,
  collectConversationProgressionSignals,
} from '../services/chat/conversationProgressionSignals.js';
import { buildSessionRetentionPayload, withThematicMicroClosureRetention } from '../services/sessionRetentionHints.js';
import { inferChatSessionPhase } from '../services/chat/sessionPhaseHints.js';
import { HISTORIAL_LIMITE, LIMITE_MENSAJES } from '../routes/chat/chatConstants.js';
import {
  openaiService,
  emotionalAnalyzer,
  contextAnalyzer,
  userProfileService
} from '../services/index.js';
import { sanitizeSessionIntentionForClient } from '../constants/sessionIntention.js';
import { normalizeStoredCrisisRiskLevel, buildOpenaiCrisisContext, shouldIncludeCrisisInOpenaiContext } from '../constants/crisis.js';
import { isLlmCrisisTherapeuticExtrasBlocked } from '../utils/chatObservationalContext.js';
import {
  applyEmotionalThreadContinuity,
  collectRecentUserTexts,
} from '../services/chat/emotionalThreadContinuity.js';
import chatProductActionProposalService from '../services/chatProductActionProposalService.js';
import {
  buildProductActionResolveMetricData,
  resolveTurnProposedProductActions,
} from '../services/chat/productActionTool.js';
import { recordEngagementSignal } from '../services/engagementStreakService.js';
import { ENGAGEMENT_SIGNAL } from '../utils/engagementStreakWeights.js';
import chatProductActionLlmService from '../services/chatProductActionLlmService.js';
import { normalizeApiLanguage } from '../utils/apiLanguage.js';
import conversationProductProposalCapService from '../services/conversationProductProposalCapService.js';
import chatCommitmentProposalService from '../services/chatCommitmentProposalService.js';
import metricsService from '../services/metricsService.js';
import { buildCrisisRoutingMetricData } from '../utils/crisisRoutingMetricPayload.js';
import crisisBackgroundActionsService from '../services/crisisBackgroundActionsService.js';
import { resolveCrisisRiskAndContext } from '../services/crisisBackgroundContextService.js';
import intenseChatCheckInService from '../services/intenseChatCheckInService.js';
import { scheduleRollingSummaryRefresh } from '../services/conversationRollingSummaryService.js';
import {
  planChatTurnEnhancements,
  emptyChatTurnEnhancements,
  settleChatTurnEnhancements,
  buildOpenaiEnhancementSnippets,
  buildAssistantMetadataWithEnhancements,
  finalizeChatTurnEnhancements,
  persistProposedCommitmentsOnMessage,
  buildClientTurnPayload,
} from '../services/chatTurnEnhancementsService.js';
import { awaitWithBudget, CHAT_PRE_LLM_ENHANCEMENT_BUDGET_MS } from '../utils/awaitWithBudget.js';
import { shouldShowCommitmentFollowUpChips } from '../services/commitmentFollowUpService.js';
import { shouldShowExperientialFollowUpChips } from '../services/experientialFollowUpService.js';
import {
  resolveSoftLandingForTurn,
} from '../services/softLandingPostCrisisService.js';
import { getPostCrisisWindow, getPostCrisisReentryWindow } from '../utils/postCrisisWindowGuard.js';
import features from '../config/features.js';
import { safeEvaluateTurnPolicy } from '../services/nexus/turnPolicyEvaluator.js';
import {
  beginTurnTrace,
  emitTurnTraceCompleted,
  emitTurnTraceConsentChecked,
  emitTurnTraceDecisionShadowed,
  emitTurnTraceFailed,
  emitTurnTraceSafety,
  emitTurnTraceSafetyThenState,
  attachConversationExtrasContext,
  noteTurnTraceAnalysis,
  noteTurnTraceShadow,
  priorAssistantCountFromHistory,
  priorIntensityFromHistory,
  noteTurnTraceProgressionAssessment,
} from '../services/nexus/turnTraceTurn.js';
import { buildTurnPurposeSnapshot } from '../services/nexus/turnPurposeSnapshot.js';
import {
  collectPersonaProjectionMeta,
  emptyPersonaProjectionMeta,
} from '../services/nexus/personaProjection.js';
import {
  buildTechniqueHandoffPromptSnippet,
  normalizeResumeFromTechnique,
} from '../services/chat/techniqueHandoffPromptSnippet.js';
import {
  buildArrivalReplyPromptSnippet,
  injectArrivalAnchorIntoPromptHistory,
  muteSessionRetentionForArrivalReply,
  resolveArrivalReplyActive,
} from '../services/chat/arrivalReplyPromptSnippet.js';
import { buildResumeFromCanvasPromptSnippet } from '../services/chat/decisionCanvasTool.js';
import {
  applyInteractiveCanvasCompetition,
  resolveInteractiveCanvasForTurn,
} from '../services/chat/interactiveCanvasTurn.js';
import { finalizeTurnPayload } from '../services/chat/chatTurnPayloadSchema.js';
import {
  shouldHardStopCrisisLlm,
} from '../services/crisisHardStopService.js';
import { crisisResourcesForTurn } from '../services/crisisResourcesService.js';
import { applyCrisisProtocolForTurn } from '../services/crisisTurnClientExtrasService.js';
import { hasCrisisBatterySignal } from '../services/crisisProtocolService.js';
import { indexPersonalPatternFromUserMessage, startPersonalPatternRagSnippet } from '../services/personalPatternRagService.js';
import { startDigitalPhenotypeChatSnippet } from '../services/digitalPhenotypeChatContextService.js';
import { startRecentAbcChatSnippet } from '../services/recentAbcChatContextService.js';
import { startSessionCommitmentChatSnippet } from '../services/sessionCommitmentPromptSnippet.js';
import { startExperientialFollowUpChatSnippet } from '../services/experientialFollowUpService.js';
import { startExperientialRecallChatSnippet } from '../services/experientialRecallService.js';
import { normalizeTccLiteState } from '../services/tccLiteConversationStateService.js';
import { resolveChatConversationForSocket } from '../utils/resolveChatConversationForSocket.js';
import {
  persistCrisisStructuredAssistantTurn,
  readProtocolWasActive,
  resolveCrisisStructuredAssistantContent,
  wasLastAssistantTurnCrisisHardStop,
} from '../services/crisisStructuredTurnService.js';
import { buildSocketChatErrorPayload, createSocketChatError } from '../utils/socketChatErrorPayload.js';
import { chatApiCopy } from '../utils/chatApiCopy.js';
import {
  acquireConversationTurnLock,
  closeOrphanUserTurn,
  CONVERSATION_BUSY_CODE,
  persistAssistantFallbackForUserMessage,
  releaseConversationTurnLock,
} from '../services/chat/conversationTurnLockService.js';
import {
  resolveIncomingChatTurn,
  removeProcessingFallbackAssistant,
} from '../services/chat/processingFallbackTurn.js';
import { iterateAssistantStreamWithRetry } from '../services/chat/iterateAssistantStreamWithRetry.js';
import {
  buildStreamingTtftMetrics,
  sanitizePhaseMs,
  streamingTtftMetricPayload,
} from '../utils/chatStreamingMetrics.js';
import {
  buildSessionToneCore,
  withCalmForced,
  resolveCalmForcedFromGates,
} from '../services/sessionToneService.js';
import { getAllowedCorsOrigins } from '../utils/corsOrigins.js';
import { persistSocketUserMessageCrisisMetadata } from '../utils/persistUserMessageCrisisMetadata.js';
import { assembleTurnHistory } from '../utils/previousEmotionalPatterns.js';

export { persistSocketUserMessageCrisisMetadata };

// Constantes de configuración
const PING_TIMEOUT = 60000; // 60 segundos
const PING_INTERVAL = 25000; // 25 segundos

// Constantes de mensajes de error
const ERROR_MESSAGES = {
  AUTH_REQUIRED: 'Autenticación requerida',
  INVALID_TOKEN: 'Token inválido',
  USER_NOT_FOUND: 'Usuario no encontrado',
  ACCOUNT_DEACTIVATED: 'Cuenta desactivada',
  USER_NOT_AUTHENTICATED: 'Usuario no autenticado'
};

// Constantes de eventos de socket
const SOCKET_EVENTS = {
  AUTHENTICATE: 'authenticate',
  MESSAGE: 'message',
  MESSAGE_SENT: 'message:sent',
  MESSAGE_CHUNK: 'message:chunk',
  MESSAGE_RECEIVED: 'message:received',
  AI_TYPING: 'ai:typing',
  CANCEL_RESPONSE: 'cancel:response',
  ERROR: 'error',
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  // Eventos de alertas de emergencia
  EMERGENCY_ALERT_SENT: 'emergency:alert:sent',
  EMERGENCY_ALERT_UPDATED: 'emergency:alert:updated',
};

const getAllowedOrigins = () =>
  getAllowedCorsOrigins({
    frontendUrl: process.env.FRONTEND_URL,
    extraOrigins: process.env.CORS_ALLOWED_ORIGINS,
    environment: process.env.NODE_ENV || 'development',
  });

// Helper: verificar y decodificar token JWT
const verifySocketToken = (token) => {
  if (!token) {
    throw new Error(ERROR_MESSAGES.AUTH_REQUIRED);
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
  }
};

/**
 * Configura y inicializa Socket.IO
 * @param {Object} server - Servidor HTTP de Express
 * @returns {Object} Instancia de Socket.IO configurada
 */
export const setupSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: getAllowedOrigins(),
      methods: ['GET', 'POST'],
      credentials: true
    },
    pingTimeout: PING_TIMEOUT,
    pingInterval: PING_INTERVAL
  });

  // Middleware de autenticación para sockets (JWT + User existente/activo)
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const payload = verifySocketToken(token);
      const userId = payload.userId || payload._id;

      if (!userId) {
        return next(new Error(ERROR_MESSAGES.INVALID_TOKEN));
      }

      if (mongoose.connection.readyState === 1) {
        const user = await User.findById(userId).select('isActive').lean();
        if (!user) {
          return next(new Error(ERROR_MESSAGES.USER_NOT_FOUND));
        }
        if (user.isActive === false) {
          return next(new Error(ERROR_MESSAGES.ACCOUNT_DEACTIVATED));
        }
      }

      socket.user = payload;
      next();
    } catch (error) {
      return next(new Error(error.message));
    }
  });

  // Manejo de eventos de conexión
  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    console.log('[SocketIO] Usuario conectado:', socket.id);
    
    let currentUserId = null;
    let responseTimeout = null;
    socket._chatTurnControl = null;
    
    /**
     * Autenticación del socket
     * El cliente debe enviar su userId para unirse a su sala personal
     */
    socket.on(SOCKET_EVENTS.AUTHENTICATE, ({ userId }) => {
      // La identidad real viene del JWT del handshake; no confiar solo en el client payload.
      const tokenUserId = (socket.user?.userId || socket.user?._id)?.toString();
      if (!tokenUserId) {
        socket.emit(
          SOCKET_EVENTS.ERROR,
          buildSocketChatErrorPayload(
            createSocketChatError(ERROR_MESSAGES.USER_NOT_AUTHENTICATED, 'UNAUTHORIZED'),
          ),
        );
        return;
      }
      if (userId && userId.toString() !== tokenUserId) {
        socket.emit(
          SOCKET_EVENTS.ERROR,
          buildSocketChatErrorPayload(
            createSocketChatError(ERROR_MESSAGES.INVALID_TOKEN, 'UNAUTHORIZED'),
          ),
        );
        return;
      }

      currentUserId = tokenUserId;
      socket.join(tokenUserId);
      console.log(`[SocketIO] Socket ${socket.id} autenticado como usuario ${currentUserId}`);
    });
    
    /**
     * Manejo de mensajes del usuario
     * Procesa mensajes y genera respuestas usando OpenAI
     */
    socket.on(SOCKET_EVENTS.MESSAGE, async (data) => {
      let userMessage = null;
      let turnTrace = null;
      let purposeSnapshot = null;
      let personaProjectionPromise = null;
      let assistantFallbackCopy = chatApiCopy('es').assistantProcessingFallback;
      try {
        // Validar que el usuario esté autenticado
        if (!currentUserId) {
          throw createSocketChatError(ERROR_MESSAGES.USER_NOT_AUTHENTICATED, 'UNAUTHORIZED');
        }

        const turnControl = { aborted: false };
        socket._chatTurnControl = turnControl;
        const turnStartTime = Date.now();
        /** @type {Record<string, number>} */
        const phaseMs = {};
        const markPhase = (name) => {
          phaseMs[name] = Date.now() - turnStartTime;
        };
        
        const resumeFailedTurn = data?.resumeFailedTurn === true;
        const incomingText =
          data && typeof data.text === 'string' ? data.text.trim() : '';
        if (!resumeFailedTurn && !incomingText) {
          throw createSocketChatError('El mensaje debe contener un texto válido', 'EMPTY_MESSAGE');
        }
        
        let messageText = incomingText;
        const userId = new mongoose.Types.ObjectId(currentUserId);
        
        // Emitir estado de escritura de la IA
        socket.emit(SOCKET_EVENTS.AI_TYPING, true);
        
        // 1. Conversación + perfil en paralelo (antes iban en cascada con el análisis)
        const [conversation, socketUser, userProfile] = await Promise.all([
          resolveChatConversationForSocket({
            userId,
            conversationId: data?.conversationId,
          }),
          User.findById(userId)
            .select(
              'preferences phone emergencyContacts signalConsent deletedAt lastSessionSummary.generatedAt',
            )
            .lean()
            .catch(() => null),
          userProfileService.getOrCreateProfile(userId).catch((err) => {
            console.error('[SocketIO] Error obteniendo perfil:', err);
            return null;
          }),
        ]);
        markPhase('convProfile');

        const socketLanguageEarly = normalizeApiLanguage(
          socketUser?.preferences?.language || userProfile?.preferences?.language,
        );
        assistantFallbackCopy = chatApiCopy(socketLanguageEarly).assistantProcessingFallback;
        let isResumeTurn = false;

        let turnLockOwner = null;
        try {
          turnLockOwner = (await acquireConversationTurnLock(conversation._id)).owner;
        } catch (lockErr) {
          socket.emit(SOCKET_EVENTS.AI_TYPING, false);
          if (lockErr?.code === CONVERSATION_BUSY_CODE) {
            lockErr.message = chatApiCopy(socketLanguageEarly).conversationBusy;
          }
          socket.emit(SOCKET_EVENTS.ERROR, buildSocketChatErrorPayload(lockErr));
          return;
        }
        markPhase('turnLock');

        try {
          const historySelect =
            'content role metadata.crisis metadata.session metadata.context.emotional metadata.context.response createdAt';
          const resolvedTurn = await resolveIncomingChatTurn({
            conversationId: conversation._id,
            incomingText: messageText,
            resumeFailedTurn,
          });
          isResumeTurn = resolvedTurn.mode === 'resume';
          if (!isResumeTurn && !resolvedTurn.text) {
            throw createSocketChatError('El mensaje debe contener un texto válido', 'EMPTY_MESSAGE');
          }
          messageText = resolvedTurn.text;

          const otherConversationsCount = Conversation.countDocuments({
            userId: userId,
            _id: { $ne: conversation._id }
          }).catch(() => null);

          let orphanAssistant = null;
          let priorHistoryRaw;
          let priorConversationCount;
          if (isResumeTurn) {
            await removeProcessingFallbackAssistant(resolvedTurn.fallbackAssistant._id);
            userMessage = resolvedTurn.userMessage;
            [priorHistoryRaw, priorConversationCount] = await Promise.all([
              Message.find({ conversationId: conversation._id })
                .select(historySelect)
                .sort({ createdAt: -1 })
                .limit(HISTORIAL_LIMITE)
                .lean(),
              otherConversationsCount,
            ]);
            markPhase('saveUser');
          } else {
            const historyQuery = Message.find({
              conversationId: conversation._id
            })
              .select(historySelect)
              .sort({ createdAt: -1 })
              .limit(HISTORIAL_LIMITE)
              .lean();
            [orphanAssistant, priorHistoryRaw, priorConversationCount] = await Promise.all([
              closeOrphanUserTurn({
                conversationId: conversation._id,
                userId,
                fallbackContent: assistantFallbackCopy,
              }),
              historyQuery,
              otherConversationsCount,
            ]);
            userMessage = new Message({
              userId: userId,
              content: messageText,
              role: 'user',
              conversationId: conversation._id,
              metadata: {
                status: 'sent'
              }
            });
            await userMessage.save();
            markPhase('saveUser');
          }
        const conversationHistory = assembleTurnHistory({
          priorHistory: priorHistoryRaw,
          orphanAssistant,
          userMessage,
          limit: HISTORIAL_LIMITE,
        });
        markPhase('history');
        turnTrace = beginTurnTrace({
          transport: 'socket',
          surface: 'registered',
          subject: { kind: 'user', id: userId },
          conversationId: String(conversation._id),
          userText: messageText,
        });
        purposeSnapshot = buildTurnPurposeSnapshot({ surface: 'registered', user: socketUser });
        emitTurnTraceConsentChecked(turnTrace, purposeSnapshot);
        personaProjectionPromise = collectPersonaProjectionMeta({
          purposeSnapshot,
          surface: 'registered',
          userId,
          lastSessionGeneratedAt: socketUser?.lastSessionSummary?.generatedAt ?? null,
        }).catch(() => emptyPersonaProjectionMeta({ surface: 'registered', purposeSnapshot }));
        if (!isResumeTurn) {
          recordEngagementSignal(userId, ENGAGEMENT_SIGNAL.CHAT_USER_MESSAGE).catch(() => {});
        
          socket.emit(SOCKET_EVENTS.MESSAGE_SENT, {
            id: userMessage._id.toString(),
            text: messageText,
            userId: currentUserId,
            conversationId: conversation._id.toString(),
            timestamp: new Date()
          });
        }

        const conversationPattern = analyzeConversationPattern(conversationHistory, messageText);

        // 4. Análisis emocional y contextual (perfil ya cargado arriba)
        const [emotionalAnalysisRaw, contextualAnalysis] = await Promise.all([
          emotionalAnalyzer.analyzeEmotion(messageText).catch(err => {
            console.error('[SocketIO] Error en análisis emocional:', err);
            return null;
          }),
          contextAnalyzer.analizarMensaje(userMessage, conversationHistory).catch(err => {
            console.error('[SocketIO] Error en análisis contextual:', err);
            return null;
          }),
        ]);
        markPhase('analyze');
        const emotionalAnalysis = applyEmotionalThreadContinuity(
          emotionalAnalysisRaw,
          collectRecentUserTexts(conversationHistory, messageText, { newestFirst: true }),
        );

        const {
          riskLevel,
          trendAnalysis,
          crisisHistory,
          conversationContext,
        } = await resolveCrisisRiskAndContext({
          userId,
          emotionalAnalysis: emotionalAnalysis || {},
          contextualAnalysis: contextualAnalysis || {},
          messageContent: messageText,
          conversationHistory,
        });
        markPhase('crisisCtx');
        try {
          // No bloquear el turno: el riesgo ya vive en memoria para este request.
          // resume / lean: updateOne+$set; documento nuevo: markModified+save.
          persistSocketUserMessageCrisisMetadata(userMessage, {
            riskLevel,
            emotionalIntensity: emotionalAnalysis?.intensity || 0,
          });
        } catch (persistRiskMetaErr) {
          console.warn('[SocketIO] metadata.crisis en mensaje usuario:', persistRiskMetaErr?.message);
        }
        indexPersonalPatternFromUserMessage({
          userId,
          conversationId: conversation._id,
          content: messageText,
          riskLevel,
        }).catch(() => {});
        // Peek post-crisis arranca ya (reuso en builders + softLandingPeek).
        const softLandingWindowPromise = features.softLandingPostCrisis
          ? getPostCrisisWindow(userId)
          : Promise.resolve({ active: false, anchorAt: null, endsAt: null });
        const reentryWindowPromise = features.softLandingPostCrisis
          ? getPostCrisisReentryWindow(userId)
          : Promise.resolve({ active: false, anchorAt: null, endsAt: null, softLandingEndsAt: null });
        // RAG / fenotipo / ABC / commitment / FU / recall eager (#203 / Oleada 3).
        const ragLanguageEarly = normalizeApiLanguage(
          data?.language ||
            userProfile?.preferences?.language ||
            userProfile?.language ||
            'es',
        );
        const personalPatternRagHandle = startPersonalPatternRagSnippet({
          userId,
          userContent: messageText,
          conversationId: conversation._id,
          language: ragLanguageEarly,
          riskLevel,
          purposeSnapshot,
        });
        const phenotypeHandle = startDigitalPhenotypeChatSnippet({
          userId,
          language: ragLanguageEarly,
          purposeSnapshot,
        });
        const abcHandle = startRecentAbcChatSnippet({
          userId,
          userContent: messageText,
          language: ragLanguageEarly,
          riskLevel,
          purposeSnapshot,
        });
        noteTurnTraceAnalysis(turnTrace, {
          riskClass: riskLevel,
          intentTipo: contextualAnalysis?.intencion?.tipo,
          topicTema: contextualAnalysis?.tema?.categoria,
        });
        const isCrisisEarly =
          riskLevel === 'MEDIUM' ||
          riskLevel === 'HIGH' ||
          (contextualAnalysis?.intencion?.tipo === 'CRISIS' &&
            contextualAnalysis?.intencion?.confianza >= 0.9 &&
            riskLevel !== 'LOW');
        const commitmentHandle = startSessionCommitmentChatSnippet({
          userId,
          conversationId: conversation._id,
          language: ragLanguageEarly,
          riskLevel,
          isCrisis: isCrisisEarly,
          conversationHistory,
          forceFollowUp: data?.resumeCommitmentFollowUp === true,
          postCrisisWindowPromise: softLandingWindowPromise,
          purposeSnapshot,
        });
        const expFuHandle = startExperientialFollowUpChatSnippet({
          userId,
          conversationHistory,
          language: ragLanguageEarly,
          riskLevel,
          forceFollowUp: data?.resumeExperientialFollowUp === true,
          postCrisisWindowPromise: softLandingWindowPromise,
          purposeSnapshot,
        });
        const recallHandle = startExperientialRecallChatSnippet({
          userId,
          userContent: messageText,
          language: ragLanguageEarly,
          riskLevel,
          postCrisisWindowPromise: softLandingWindowPromise,
          purposeSnapshot,
        });
        markPhase('ragStart');
        const isCrisis = isCrisisEarly;
        // Hard-stop no depende de crisisBg; se evalúa tras crisisCtx.
        const willHardStop = shouldHardStopCrisisLlm({
          riskLevel,
          messageContent: messageText,
        });
        const emptyMemory = { recurringThemes: [], lastInteraction: 'ninguna' };
        const memoryContextPromise = willHardStop
          ? Promise.resolve(emptyMemory)
          : memoryService
              .getRelevantContext(
                userId,
                messageText,
                {
                  emotional: emotionalAnalysis,
                  contextual: contextualAnalysis,
                },
                { purposeSnapshot },
              )
              .catch(() => emptyMemory);
        const therapeuticRecordPromise = willHardStop
          ? Promise.resolve(null)
          : TherapeuticRecord.findOne({ userId }).lean().catch(() => null);

        let crisisBgResult = null;
        try {
          crisisBgResult = await crisisBackgroundActionsService.runCrisisBackgroundActionsForTurn({
            userId,
            messageId: userMessage._id,
            messageContent: messageText,
            riskLevel,
            emotionalAnalysis,
            contextualAnalysis,
            trendAnalysis,
            crisisHistory,
            conversationContext,
            conversationId: conversation._id,
            transport: 'socket',
            isCrisis,
          });
        } catch (bgErr) {
          console.error('[SocketIO] Error en acciones de crisis en segundo plano:', bgErr);
        }
        markPhase('crisisBg');

        const sessionPhase = inferChatSessionPhase({
          riskLevel,
          contextualAnalysis: contextualAnalysis || {},
          userContent: messageText,
          conversationHistoryNewestFirst: conversationHistory
        });
        const sessionRetention = withThematicMicroClosureRetention(
          buildSessionRetentionPayload({
            conversationHistoryNewestFirst: conversationHistory,
            userContent: messageText,
            priorConversationCount,
            threadMessageLimit: LIMITE_MENSAJES,
            conversationPattern
          }),
          { sessionPhase, conversationHistoryNewestFirst: conversationHistory }
        );

        // 5. Preparar historial para el prompt
        const historialParaPrompt = buildHistoryForPromptFromMessages(conversationHistory, {
          emotional: emotionalAnalysis,
          contextual: contextualAnalysis,
          currentMessage: messageText,
          _promptTelemetry: {
            userId,
            conversationId: conversation._id,
            source: 'socket',
            callSite: 'buildHistoryForPromptFromMessages'
          }
        });
        
        // 6. Extras de turno (sugerencias, TCC lite, protocolos activos)
        const sessionIntentionSafe = sanitizeSessionIntentionForClient(conversation.sessionIntention);
        const socketLanguage = normalizeApiLanguage(
          data?.language ||
            userProfile?.preferences?.language ||
            userProfile?.language ||
            'es',
        );
        const socketPreferences = {
          ...(userProfile?.preferences || {}),
          ...(socketUser?.preferences || {}),
        };
        const protocolWasActive = readProtocolWasActive(conversation);
        const previousAssistantWasHardStop =
          wasLastAssistantTurnCrisisHardStop(conversationHistory);
        let crisisTurnClientExtras = await applyCrisisProtocolForTurn({
          conversation,
          userId,
          user: socketUser,
          riskLevel,
          messageContent: messageText,
          contextualAnalysis,
          trendAnalysis,
          crisisHistory,
          conversationContext,
          hardStop: willHardStop,
          isCrisis,
          hadContactAlert: crisisBgResult?.alertSent === true,
          language: socketLanguage,
          preferences: socketPreferences,
          phone: socketUser?.phone || null,
        });
        markPhase('crisisProto');
        /** @type {object|null} */
        let softLandingClientPayload = null;
        const buildSocketCrisisPayload = ({ hardStop = false } = {}) => {
          const protocolActive = crisisTurnClientExtras?.crisisProtocolState?.active === true;
          const batterySignal = hasCrisisBatterySignal(
            messageText,
            crisisTurnClientExtras?.crisisDecision,
          );
          if (hardStop) {
            crisisTurnClientExtras = {
              ...crisisTurnClientExtras,
              crisisResources: crisisResourcesForTurn({
                riskLevel,
                hardStop: true,
                isCrisis: true,
                hasBatterySignal: batterySignal,
                crisisProtocolActive: protocolActive,
                preferences: socketPreferences,
                phone: socketUser?.phone || null,
                language: socketLanguage,
                showContactAlertNotice:
                  crisisTurnClientExtras?.crisisProtocolState?.hadContactAlert === true ||
                  crisisBgResult?.alertSent === true,
              }),
            };
          }
          const crisisResources =
            crisisTurnClientExtras?.crisisResources ??
            crisisResourcesForTurn({
              riskLevel,
              hardStop,
              isCrisis,
              hasBatterySignal: batterySignal,
              crisisProtocolActive: protocolActive,
              preferences: socketPreferences,
              phone: socketUser?.phone || null,
              language: socketLanguage,
              showContactAlertNotice:
                crisisTurnClientExtras?.crisisProtocolState?.hadContactAlert === true ||
                crisisBgResult?.alertSent === true,
            });
          return {
            ...(crisisResources ? { crisisResources } : {}),
            ...(crisisTurnClientExtras?.proposedEmergencyContactAlert
              ? {
                  proposedEmergencyContactAlert:
                    crisisTurnClientExtras.proposedEmergencyContactAlert,
                }
              : {}),
            ...(crisisTurnClientExtras?.softCrisisCheckIn
              ? { softCrisisCheckIn: crisisTurnClientExtras.softCrisisCheckIn }
              : {}),
            ...(crisisTurnClientExtras?.safeguardingOverlay
              ? { safeguardingOverlay: crisisTurnClientExtras.safeguardingOverlay }
              : {}),
            ...(softLandingClientPayload ? { softLanding: softLandingClientPayload } : {}),
          };
        };

        /** Core #84: una vez por turno (recordInMemory + hysteresis). */
        let sessionToneCore = undefined;
        const withSessionTone = (payload, { hardStop = false } = {}) => {
          const calmForced = resolveCalmForcedFromGates({
            hasCrisisResources: Boolean(payload?.crisisResources),
            hasSoftCrisisCheckIn: Boolean(payload?.softCrisisCheckIn),
            hasSafeguardingOverlay: Boolean(payload?.safeguardingOverlay),
            hasSoftLanding: Boolean(payload?.softLanding?.strip),
            crisisHardStop: hardStop === true,
            protocolActive: crisisTurnClientExtras?.crisisProtocolState?.active === true,
          });
          if (sessionToneCore === undefined) {
            sessionToneCore = buildSessionToneCore({
              userId: userId.toString(),
              emotionalAnalysis,
              sessionEmotionalState: conversation?.sessionEmotionalState || null,
              recordInMemory: true,
            });
          }
          const sessionTone = withCalmForced(sessionToneCore, calmForced);
          return sessionTone ? { ...payload, sessionTone } : payload;
        };

        const structuredCrisisTurn = resolveCrisisStructuredAssistantContent({
          willHardStop,
          protocolWasActive,
          previousAssistantWasHardStop,
          protocolExitingThisTurn: Boolean(crisisTurnClientExtras?.crisisProtocolExit),
          messageContent: messageText,
          language: socketLanguage,
          preferences: socketPreferences,
          phone: socketUser?.phone || null,
        });
        const structuredHardStop =
          structuredCrisisTurn?.hardStop === true || structuredCrisisTurn?.kind === 'hard_stop';
        const personaInput = personaProjectionPromise
          ? await personaProjectionPromise
          : emptyPersonaProjectionMeta({ surface: 'registered', purposeSnapshot });
        emitTurnTraceSafetyThenState(turnTrace, {
          safetySignals: {
            hardStop: structuredCrisisTurn?.content ? structuredHardStop : willHardStop === true,
            crisisResources: crisisTurnClientExtras?.crisisResources,
            softCrisisCheckIn: crisisTurnClientExtras?.softCrisisCheckIn,
            safeguardingOverlay: crisisTurnClientExtras?.safeguardingOverlay,
          },
          stateInput: {
            emotionalAnalysis,
            conversationPattern,
            timezone: socketUser?.preferences?.timezone || null,
          },
          priorAssistantCount: priorAssistantCountFromHistory(conversationHistory),
          personaInput,
          trajectoryInput: {
            emotionalAnalysis,
            conversationPattern,
            priorIntensity: priorIntensityFromHistory(conversationHistory),
            priorPeakIntensity: conversation?.sessionEmotionalState?.peakIntensity,
          },
          progressionSignals: collectConversationProgressionSignals({
            userMessage: messageText,
            conversationHistory,
            conversationPattern,
            sessionRetention,
            sessionPhase,
            sessionIntention: conversation?.sessionIntention || null,
          }),
        });

        attachConversationExtrasContext(turnTrace, {
          conversationHistory,
        });

        if (structuredCrisisTurn?.content) {
          if (structuredCrisisTurn.kind === 'hard_stop') {
            metricsService
              .recordMetric(
                'crisis_hard_stop',
                buildCrisisRoutingMetricData({
                  riskLevel,
                  transport: 'socket',
                  messageContent: messageText,
                }),
                userId.toString(),
                { conversationId: String(conversation._id) },
              )
              .catch(() => {});
          } else {
            metricsService
              .recordMetric(
                'crisis_protocol_follow_up',
                {
                  transport: 'socket',
                  protocolWasActive: true,
                },
                userId.toString(),
                { conversationId: String(conversation._id) },
              )
              .catch(() => {});
          }

          const { assistantMessage, clientTurn } = await persistCrisisStructuredAssistantTurn({
            userId,
            conversationId: conversation._id,
            content: structuredCrisisTurn.content,
            riskLevel,
            hardStop: structuredCrisisTurn.hardStop,
            kind: structuredCrisisTurn.kind,
            emotionalAnalysis,
            contextualAnalysis,
            language: socketLanguage,
          });
          const structuredTurnPolicy = safeEvaluateTurnPolicy({
            surface: 'registered',
            crisisExtras: true,
            hardStop: structuredHardStop,
            protocol93:
              structuredCrisisTurn.kind === 'protocol_follow_up' ||
              crisisTurnClientExtras?.crisisProtocolState?.active === true,
            soft19: Boolean(crisisTurnClientExtras?.softCrisisCheckIn),
            safeguarding: Boolean(crisisTurnClientExtras?.safeguardingOverlay),
          });
          noteTurnTraceAnalysis(turnTrace, {
            muteFlags: structuredTurnPolicy.muteFlags,
          });
          emitTurnTraceSafety(turnTrace, {
            hardStop: structuredHardStop,
            crisisResources: crisisTurnClientExtras?.crisisResources,
            softCrisisCheckIn: crisisTurnClientExtras?.softCrisisCheckIn,
            safeguardingOverlay: crisisTurnClientExtras?.safeguardingOverlay,
          });
          noteTurnTraceShadow(turnTrace, {
            choice: structuredHardStop ? 'hard_stop' : 'implicit_llm',
            constraints: structuredTurnPolicy.muteFlags,
            payload: {
              suggestions: clientTurn.suggestions,
              tccLite: clientTurn.tccLite,
              proposedProductActions: [],
              proposedCommitments: [],
              crisisResources: crisisTurnClientExtras?.crisisResources,
              safeguardingOverlay: crisisTurnClientExtras?.safeguardingOverlay,
            },
          });
          noteTurnTraceProgressionAssessment(
            turnTrace,
            assessConversationProgressionStructure(turnTrace?.progression, structuredCrisisTurn.content),
          );
          emitTurnTraceCompleted(turnTrace, { model: null });

          intenseChatCheckInService
            .maybeSchedule({
              userId,
              conversationId: conversation._id,
              assistantMessageId: assistantMessage._id,
              emotionalAnalysis,
              riskLevel,
              isCrisis: true,
            })
            .catch(() => {});

          scheduleRollingSummaryRefresh({
            conversationId: conversation._id,
            userId,
            isGuest: false,
          }).catch(() => {});

          socket.emit(SOCKET_EVENTS.MESSAGE_CHUNK, {
            content: structuredCrisisTurn.content,
            conversationId: conversation._id.toString(),
          });
          socket.emit(SOCKET_EVENTS.AI_TYPING, false);
          socket.emit(
            SOCKET_EVENTS.MESSAGE_RECEIVED,
            withSessionTone(
              {
                id: assistantMessage._id.toString(),
                text: structuredCrisisTurn.content,
                userId: currentUserId,
                conversationId: conversation._id.toString(),
                timestamp: new Date(),
                crisisHardStop: structuredCrisisTurn.hardStop === true,
                proposedProductActions: [],
                proposedCommitments: [],
                productActionStatus: { paused: false, reason: null, askFirst: false },
                suggestions: clientTurn.suggestions,
                suggestionsPersonalized: clientTurn.suggestionsPersonalized,
                tccLite: clientTurn.tccLite,
                ...buildSocketCrisisPayload({ hardStop: structuredCrisisTurn.hardStop === true }),
              },
              { hardStop: structuredCrisisTurn.hardStop === true },
            ),
          );
          return;
        }

        emitTurnTraceSafety(turnTrace, {
          hardStop: willHardStop === true,
          crisisResources: crisisTurnClientExtras?.crisisResources,
          softCrisisCheckIn: crisisTurnClientExtras?.softCrisisCheckIn,
          safeguardingOverlay: crisisTurnClientExtras?.safeguardingOverlay,
        });

        const softCrisisCheckInActive =
          crisisTurnClientExtras?.softCrisisCheckInState?.active === true ||
          Boolean(crisisTurnClientExtras?.softCrisisCheckIn);
        const safeguardingOverlayActive =
          crisisTurnClientExtras?.safeguardingOverlayState?.active === true;
        // Peek reusa la promesa ya arrancada; memory/therapeutic corren desde willHardStop.
        const [softLandingWindow, reentryWindowEarly] = await Promise.all([
          softLandingWindowPromise,
          reentryWindowPromise,
        ]);
        const softLandingActivePeek = softLandingWindow?.active === true;
        const reentryActivePeek = reentryWindowEarly?.active === true;
        markPhase('softLandingPeek');

        const resumeFromTechniqueNormalized = normalizeResumeFromTechnique(
          data?.resumeFromTechnique,
        );
        const resumeFromCanvasActive = data?.resumeFromCanvas === true;
        const deferPreLlm = features.chatDeferPreLlm === true;
        const enhancementsPromise = planChatTurnEnhancements({
          userId,
          conversationId: conversation._id,
          userContent: messageText,
          conversationHistory,
          emotionalAnalysis,
          contextualAnalysis,
          riskLevel,
          sessionIntention: sessionIntentionSafe,
          language: socketLanguage,
          resumeTccLite:
            data?.resumeTccLite && typeof data.resumeTccLite === 'object'
              ? data.resumeTccLite
              : null,
          resumeCommitmentFollowUp: data?.resumeCommitmentFollowUp === true,
          resumeExperientialFollowUp: data?.resumeExperientialFollowUp === true,
          resumeMirrorDeepen: data?.resumeMirrorDeepen === true,
          resumeFromTechnique: resumeFromTechniqueNormalized,
          resumeFromCanvas: resumeFromCanvasActive,
          isCrisis,
          softLandingActive: softLandingActivePeek,
          reentryActive: reentryActivePeek,
          safeguardingOverlayActive,
          ragHandle: personalPatternRagHandle,
          phenotypeHandle,
          abcHandle,
          commitmentHandle,
          expFuHandle,
          recallHandle,
          persistedTccLiteState: normalizeTccLiteState(conversation?.tccLiteState),
          turnTrace,
        });
        const [softLandingResolved, turnEnhancementsPrompt, memoriaContextual, registroTerapeutico] =
          await Promise.all([
            resolveSoftLandingForTurn({
              userId,
              language: socketLanguage,
              window: softLandingWindow,
              suppressStrip:
                softCrisisCheckInActive ||
                Boolean(crisisTurnClientExtras?.safeguardingOverlay) ||
                crisisTurnClientExtras?.crisisProtocolState?.active === true ||
                willHardStop ||
                Boolean(crisisTurnClientExtras?.crisisResources),
            }),
            deferPreLlm
              ? awaitWithBudget(
                  enhancementsPromise,
                  CHAT_PRE_LLM_ENHANCEMENT_BUDGET_MS,
                  emptyChatTurnEnhancements(),
                )
              : enhancementsPromise,
            deferPreLlm
              ? awaitWithBudget(memoryContextPromise, CHAT_PRE_LLM_ENHANCEMENT_BUDGET_MS, emptyMemory)
              : memoryContextPromise,
            deferPreLlm
              ? awaitWithBudget(therapeuticRecordPromise, CHAT_PRE_LLM_ENHANCEMENT_BUDGET_MS, null)
              : therapeuticRecordPromise,
          ]);
        let turnEnhancements = turnEnhancementsPrompt;
        softLandingClientPayload = softLandingResolved.softLanding;
        const softLandingActive = softLandingResolved.softLandingActive === true;
        const reentryActive = softLandingResolved.reentryActive === true;
        markPhase('enhancements');
        const ragJoinMeta = turnEnhancements?.personalPatternRagJoin || {};
        const ragJoinStatus = ragJoinMeta.joinStatus || 'miss';
        const phenotypeJoinMeta = turnEnhancements?.digitalPhenotypeJoin || {};
        const abcJoinMeta = turnEnhancements?.recentAbcJoin || {};
        const commitmentJoinMeta = turnEnhancements?.commitmentJoin || {};
        const expFuJoinMeta = turnEnhancements?.expFuJoin || {};
        const recallJoinMeta = turnEnhancements?.recallJoin || {};
        metricsService
          .recordMetric(
            'chat_usage',
            {
              action: `rag_join_${ragJoinStatus}`,
              isGuest: false,
              ...(ragJoinMeta.ragMs != null ? { ragMs: ragJoinMeta.ragMs } : {}),
            },
            userId.toString(),
            {
              conversationId: String(conversation._id),
              transport: 'socket',
              endpoint: 'chat',
              surface: 'registered',
            },
          )
          .catch(() => {});
        metricsService
          .recordMetric(
            'chat_usage',
            {
              action: `phenotype_join_${phenotypeJoinMeta.joinStatus || 'miss'}`,
              isGuest: false,
              ...(phenotypeJoinMeta.joinMs != null ? { joinMs: phenotypeJoinMeta.joinMs } : {}),
            },
            userId.toString(),
            { conversationId: String(conversation._id), transport: 'socket' },
          )
          .catch(() => {});
        metricsService
          .recordMetric(
            'chat_usage',
            {
              action: `abc_join_${abcJoinMeta.joinStatus || 'miss'}`,
              isGuest: false,
              ...(abcJoinMeta.joinMs != null ? { joinMs: abcJoinMeta.joinMs } : {}),
            },
            userId.toString(),
            { conversationId: String(conversation._id), transport: 'socket' },
          )
          .catch(() => {});
        for (const [prefix, meta] of [
          ['commitment_join', commitmentJoinMeta],
          ['exp_fu_join', expFuJoinMeta],
          ['recall_join', recallJoinMeta],
        ]) {
          metricsService
            .recordMetric(
              'chat_usage',
              {
                action: `${prefix}_${meta.joinStatus || 'miss'}`,
                isGuest: false,
                ...(meta.joinMs != null ? { joinMs: meta.joinMs } : {}),
              },
              userId.toString(),
              { conversationId: String(conversation._id), transport: 'socket' },
            )
            .catch(() => {});
        }
        const socketLang = socketLanguage;
        const techniqueHandoffPromptSnippet = buildTechniqueHandoffPromptSnippet(
          resumeFromTechniqueNormalized,
          socketLang,
        );
        const resumeFromCanvasPromptSnippet = buildResumeFromCanvasPromptSnippet(
          resumeFromCanvasActive,
          socketLang,
        );
        const arrivalReplyActive = resolveArrivalReplyActive({
          replyToArrival: data?.replyToArrival === true,
          conversationHistory,
        });
        const arrivalReplyPromptSnippet = buildArrivalReplyPromptSnippet(
          arrivalReplyActive,
          socketLang,
        );
        const sessionRetentionForPrompt = muteSessionRetentionForArrivalReply(
          sessionRetention,
          arrivalReplyActive,
        );
        const historialParaPromptConLlegada = injectArrivalAnchorIntoPromptHistory(
          historialParaPrompt,
          { active: arrivalReplyActive, language: socketLang },
        );
        const turnPolicy = safeEvaluateTurnPolicy({
          surface: 'registered',
          crisisExtras: isLlmCrisisTherapeuticExtrasBlocked({
            riskLevel,
            userMessage: messageText,
          }),
          hardStop: willHardStop === true,
          protocol93: crisisTurnClientExtras?.crisisProtocolState?.active === true,
          soft19: softCrisisCheckInActive === true,
          safeguarding: safeguardingOverlayActive === true,
          softLanding: softLandingActive === true,
          reentry: reentryActive === true,
          canvas: resumeFromCanvasActive === true,
          techniqueHandoff: Boolean(resumeFromTechniqueNormalized),
        });
        const promptSnippets = buildOpenaiEnhancementSnippets(turnEnhancements, {
          blockTherapeuticExtras: turnPolicy.blockTherapeuticExtras,
          blockCrisisExtras: turnPolicy.blockTherapeuticExtras,
          language: socketLang,
        });
        noteTurnTraceAnalysis(turnTrace, {
          riskClass: riskLevel,
          intentTipo: contextualAnalysis?.intencion?.tipo,
          topicTema: contextualAnalysis?.tema?.categoria,
          muteFlags: turnPolicy.muteFlags,
        });
        const showCommitmentFollowUpChips = shouldShowCommitmentFollowUpChips({
          conversationHistory,
          forceFollowUp: data?.resumeCommitmentFollowUp === true,
        });
        const showExperientialFollowUpChips = shouldShowExperientialFollowUpChips({
          conversationHistory,
          forceFollowUp: data?.resumeExperientialFollowUp === true,
        });

        if (
          shouldIncludeCrisisInOpenaiContext(riskLevel, {
            isCrisis,
            userMessage: messageText,
          })
        ) {
          metricsService
            .recordMetric(
              'crisis_llm_path',
              buildCrisisRoutingMetricData({
                riskLevel,
                transport: 'socket',
                messageContent: messageText,
              }),
              userId.toString(),
              { conversationId: String(conversation._id) },
            )
            .catch(() => {});
        }

        const responseStrategyHint =
          sessionIntentionSafe === 'vent'
            ? 'validate_first_then_action'
            : sessionIntentionSafe === 'plan'
              ? 'action_first_then_validation'
              : 'balanced';
        const openaiContext = {
          userId: userId?.toString?.() || String(userId || ''),
          rollingSummary: conversation?.rollingSummary || null,
          sessionPhase,
          safetyHistory: conversationHistory.map((m) => ({
            role: m.role,
            content: m.content || '',
          })),
          history: historialParaPromptConLlegada,
          emotional: emotionalAnalysis,
          contextual: contextualAnalysis,
          profile: {
            ...(userProfile && typeof userProfile === 'object' ? userProfile : {}),
            preferences: socketPreferences,
          },
          timezone: socketUser?.preferences?.timezone || null,
          userMessage: messageText,
          memory: memoriaContextual || { recurringThemes: [], lastInteraction: 'ninguna' },
          therapeutic: registroTerapeutico || {},
          currentConversationId: conversation._id,
          sessionPhase,
          sessionRetention: sessionRetentionForPrompt,
          conversationPattern,
          sessionIntention: sessionIntentionSafe,
          conversationProgression: turnTrace?.progression || null,
          experienceLoadCue: turnTrace?.experience?.loadCue || null,
          experienceModality: turnTrace?.experience?.modality || null,
          experienceTimingCue: turnTrace?.experience?.timingCue || null,
          experienceSessionBand: turnTrace?.experience?.sessionBand || null,
          experienceCloseCue: turnTrace?.experience?.closeCue || null,
          nexusTurnId: turnTrace?.turnId || null,
          activationBand: turnTrace?.state?.activationBand || null,
          loadBand: turnTrace?.state?.loadBand || null,
          opennessBand: turnTrace?.state?.opennessBand || null,
          intentCandidate: turnTrace?.intentCandidate || null,
          safetyRoute: turnTrace?.safetyRoute || 'none',
          muteFlags: Array.isArray(turnPolicy.muteFlags) ? turnPolicy.muteFlags : [],
          conversationExtrasEligibility: turnTrace?.extrasEligibility || null,
          responseStrategyHint,
          language: socketLang,
          purposeSnapshot,
          softCrisisCheckInActive,
          softLandingActive,
          reentryActive,
          softLandingPromptSnippet: softLandingResolved.softLandingPromptSnippet,
          safeguardingOverlayActive,
          safeguardingOverlayMinorInText:
            crisisTurnClientExtras?.safeguardingOverlayState?.minorInText === true,
          resumeFromTechniqueActive: Boolean(resumeFromTechniqueNormalized),
          techniqueHandoffPromptSnippet,
          resumeFromCanvasActive,
          resumeFromCanvasPromptSnippet,
          arrivalReplyActive,
          arrivalReplyPromptSnippet,
          psychoeducationPromptSnippet: promptSnippets.psychoeducationPromptSnippet,
          activeTccProtocolsPromptSnippet: promptSnippets.activeTccProtocolsPromptSnippet,
          tccLitePromptSnippet: promptSnippets.tccLitePromptSnippet,
          digitalPhenotypePromptSnippet: promptSnippets.digitalPhenotypePromptSnippet,
          recentAbcPromptSnippet: promptSnippets.recentAbcPromptSnippet,
          personalPatternRagPromptSnippet: promptSnippets.personalPatternRagPromptSnippet,
          commitmentFollowUpPromptSnippet: promptSnippets.commitmentFollowUpPromptSnippet,
          sessionCommitmentPromptSnippet: promptSnippets.sessionCommitmentPromptSnippet,
          experientialFollowUpPromptSnippet: promptSnippets.experientialFollowUpPromptSnippet,
          experientialRecallPromptSnippet: promptSnippets.experientialRecallPromptSnippet,
          techniqueSuggestionPromptSnippet: promptSnippets.techniqueSuggestionPromptSnippet,
          gratitudeJournalPromptSnippet: promptSnippets.gratitudeJournalPromptSnippet,
          crisis: buildOpenaiCrisisContext({
            riskLevel,
            isCrisis,
            userMessage: messageText,
            preferences: {
              ...(userProfile?.preferences || {}),
              ...(socketUser?.preferences || {}),
            },
            phone: socketUser?.phone || null,
          }),
          crisisMetricTransport: 'socket',
          _promptTelemetry: {
            userId,
            conversationId: conversation._id,
            source: 'socket',
            callSite: 'buildHistoryForPromptFromMessages',
          },
        };

        metricsService
          .recordMetric(
            'chat_usage',
            { action: 'streaming_request', isGuest: false },
            userId.toString(),
            {
              conversationId: String(conversation._id),
              transport: 'socket',
              endpoint: 'chat',
              surface: 'registered',
              streaming: true,
            },
          )
          .catch(() => {});

        const preLlmEndAt = Date.now();
        let firstChunkAt = null;
        let streamDoneAt = null;
        let streamResponse = null;

        for await (const event of iterateAssistantStreamWithRetry(
          () => openaiService.generarRespuestaStream(userMessage, openaiContext),
        )) {
          if (turnControl.aborted) {
            emitTurnTraceFailed(turnTrace, { errorCode: 'TURN_ABORTED' });
            await persistAssistantFallbackForUserMessage({
              userMessage,
              conversationId: conversation._id,
              userId,
              fallbackContent: assistantFallbackCopy,
            }).catch(() => {});
            socket.emit(SOCKET_EVENTS.AI_TYPING, false);
            socket.emit(
              SOCKET_EVENTS.ERROR,
              buildSocketChatErrorPayload({ code: 'TURN_ABORTED', message: 'Turno cancelado' }),
            );
            return;
          }
          if (event.type === 'chunk') {
            const chunkText = typeof event.content === 'string' ? event.content : '';
            if (!chunkText) continue;
            if (!firstChunkAt) {
              firstChunkAt = Date.now();
              const ttftMetrics = buildStreamingTtftMetrics({
                startTime: turnStartTime,
                preLlmEndAt,
                firstChunkAt,
              });
              const phaseMsSafe = sanitizePhaseMs(phaseMs);
              metricsService
                .recordMetric(
                  'chat_usage',
                  {
                    action: 'streaming_first_chunk',
                    isGuest: false,
                    ...streamingTtftMetricPayload(ttftMetrics),
                  },
                  userId.toString(),
                  {
                    conversationId: String(conversation._id),
                    transport: 'socket',
                    endpoint: 'chat',
                    surface: 'registered',
                    streaming: true,
                    ...(phaseMsSafe ? { phaseMs: phaseMsSafe } : {}),
                  },
                )
                .catch(() => {});
            }
            socket.emit(SOCKET_EVENTS.MESSAGE_CHUNK, {
              content: chunkText,
              conversationId: conversation._id.toString(),
            });
          } else if (event.type === 'done') {
            streamDoneAt = Date.now();
            streamResponse = { content: event.content, context: event.context };
            break;
          }
        }

        if (turnControl.aborted) {
          emitTurnTraceFailed(turnTrace, { errorCode: 'TURN_ABORTED' });
          await persistAssistantFallbackForUserMessage({
            userMessage,
            conversationId: conversation._id,
            userId,
            fallbackContent: assistantFallbackCopy,
          }).catch(() => {});
          socket.emit(SOCKET_EVENTS.AI_TYPING, false);
          socket.emit(
            SOCKET_EVENTS.ERROR,
            buildSocketChatErrorPayload({ code: 'TURN_ABORTED', message: 'Turno cancelado' }),
          );
          return;
        }

        if (!streamResponse?.content) {
          throw createSocketChatError('Respuesta vacía del stream de chat', 'STREAM_INCOMPLETE');
        }

        if (!firstChunkAt && streamResponse.content) {
          socket.emit(SOCKET_EVENTS.MESSAGE_CHUNK, {
            content: streamResponse.content,
            conversationId: conversation._id.toString(),
            synthetic: true,
          });
        }

        const response = streamResponse;
        const modelRouting = response.context?.modelRouting || null;
        if (deferPreLlm) {
          turnEnhancements = await settleChatTurnEnhancements(enhancementsPromise);
        }

        // 7. Guardar mensaje del asistente
        const { attachInferredBlocksToMetadata } = await import(
          '../utils/chatMessageBlocksHelper.js'
        );
        const assistantMessage = new Message({
          userId: userId,
          content: response.content,
          role: 'assistant',
          conversationId: conversation._id,
          metadata: attachInferredBlocksToMetadata(
            buildAssistantMetadataWithEnhancements(
              {
                status: 'sent',
                crisis: { riskLevel: normalizeStoredCrisisRiskLevel(riskLevel) },
                context: {
                  emotional: emotionalAnalysis,
                  contextual: contextualAnalysis,
                  response: JSON.stringify(response.context)
                }
              },
              turnEnhancements.tccLitePlan,
              socketLanguage,
              { model: modelRouting?.model || null, surface: 'chat' },
            ),
            response.content,
          ),
        });
        await assistantMessage.save();
        {
          const ttftMetrics = firstChunkAt
            ? buildStreamingTtftMetrics({
                startTime: turnStartTime,
                preLlmEndAt,
                firstChunkAt,
              })
            : null;
          noteTurnTraceProgressionAssessment(
            turnTrace,
            assessConversationProgressionStructure(turnTrace?.progression, response.content),
          );
          emitTurnTraceCompleted(turnTrace, {
            model: modelRouting?.model || null,
            ttftMs: ttftMetrics?.ttftMs ?? null,
            preLlmMs: ttftMetrics?.preLlmMs ?? null,
            deferShadow: true,
          });
        }

        intenseChatCheckInService
          .maybeSchedule({
            userId,
            conversationId: conversation._id,
            assistantMessageId: assistantMessage._id,
            emotionalAnalysis,
            riskLevel,
            isCrisis,
          })
          .catch(() => {});

        await finalizeChatTurnEnhancements({
          conversationId: conversation._id,
          userId,
          assistantMessageId: assistantMessage._id,
          tccLitePlan: turnEnhancements.tccLitePlan,
          suggestionPlan: turnEnhancements.suggestionPlan,
          emotionalAnalysis,
          contextualAnalysis,
          userContent: messageText,
          riskLevel,
          commitmentFollowUpPlan: turnEnhancements.commitmentFollowUpPlan,
          commitmentFollowUpCommitmentId: turnEnhancements.commitmentFollowUpCommitmentId,
          showCommitmentFollowUpChips,
          experientialFollowUpPlan: turnEnhancements.experientialFollowUpPlan,
          showExperientialFollowUpChips,
        }).catch(() => {});
        
        // 8. Actualizar última conversación
        await Conversation.findByIdAndUpdate(conversation._id, { 
          lastMessage: assistantMessage._id 
        });

        let proposedProductActions = [];
        let productActionStatus = { paused: false, reason: null, askFirst: false };
        const productActionEnrichmentCtx =
          chatProductActionProposalService.resolveProductActionEnrichmentContext({
            userContent: messageText,
            assistantContent: response.content,
            conversationHistory,
          });
        let productActionSource = 'none';
        let productActionToolEnabledForTurn =
          response.context?.productActionToolEnabled === true;
        try {
          const resolved = resolveTurnProposedProductActions({
            toolActions: response.context?.toolProposedProductActions,
            productActionToolEnabled: productActionToolEnabledForTurn,
            userContent: messageText,
            buildHeuristic: () =>
              chatProductActionProposalService.buildProposedProductActions({
                riskLevel,
                isCrisis,
                softLandingActive,
                reentryActive,
                safeguardingOverlayActive,
                language: socketLanguage,
                userContent: messageText,
                assistantContent: response.content,
                sessionIntention: conversation?.sessionIntention,
                conversationId: conversation._id,
                assistantMessageId: assistantMessage._id,
                conversationHistory,
              }),
          });
          proposedProductActions = resolved.actions;
          productActionSource = resolved.source;
          productActionToolEnabledForTurn = resolved.toolEnabled;
        } catch (propErr) {
          console.error('[SocketIO] proposedProductActions:', propErr);
        }
        if (proposedProductActions.length > 0) {
          try {
            const proposalEval =
              await conversationProductProposalCapService.evaluateProposedProductActionsState(
                messageText,
                conversation._id,
                proposedProductActions
              );
            proposedProductActions = proposalEval.actions;
            productActionStatus = proposalEval.status || productActionStatus;
          } catch (capErr) {
            console.warn('[SocketIO] product proposal cap:', capErr?.message || capErr);
          }
        }
        if (proposedProductActions.length > 0) {
          try {
            proposedProductActions =
              await chatProductActionLlmService.enrichProposedProductActionsWithLlm(
                proposedProductActions,
                {
                  userContent: productActionEnrichmentCtx.userContent,
                  assistantContent: productActionEnrichmentCtx.assistantContent,
                  primaryPsychoeducationId:
                    turnEnhancements.suggestionPlan?.primaryPsychoeducationId || null,
                  language: socketLanguage,
                }
              );
          } catch (llmPropErr) {
            console.warn('[SocketIO] proposedProductActions LLM:', llmPropErr?.message || llmPropErr);
          }
          
          // Filtrado de reentrada (#229): 1 CTA global — home viva ⇒ chat 0; omitida ⇒ máx 1
          if (reentryActive && proposedProductActions.length > 0) {
            try {
              const { applyReentryChatProductActionCap } = await import('../services/reentryProductOfferService.js');
              const reentryWindow = await import('../utils/postCrisisWindowGuard.js')
                .then(m => m.getPostCrisisReentryWindow(userId));
              proposedProductActions = await applyReentryChatProductActionCap(
                proposedProductActions,
                {
                  userId,
                  reentryActive: true,
                  reentryAnchorAt: reentryWindow?.anchorAt,
                },
              );
            } catch (reentryErr) {
              console.warn('[SocketIO] reentry filter:', reentryErr?.message || reentryErr);
            }
          }
          
          metricsService
            .recordMetric(
              'product_action_proposed',
              {
                count: proposedProductActions.length,
                types: proposedProductActions.map((a) => a.type),
                source: productActionSource,
                transport: 'socket'
              },
              currentUserId,
              { conversationId: String(conversation._id) }
            )
            .catch(() => {});
          conversationProductProposalCapService
            .incrementNonExplicitProductProposalCountIfApplied(
              messageText,
              conversation._id,
              proposedProductActions.length
            )
            .catch((incErr) =>
              console.warn('[SocketIO] product proposal cap inc:', incErr?.message || incErr)
            );
        }

        metricsService
          .recordMetric(
            'product_action_resolve',
            buildProductActionResolveMetricData({
              toolEnabled: productActionToolEnabledForTurn,
              source: productActionSource,
              actions: proposedProductActions,
              transport: 'socket',
            }),
            currentUserId,
            { conversationId: String(conversation._id) }
          )
          .catch(() => {});

        const proposedCommitments =
          proposedProductActions.length > 0
            ? []
            : await chatCommitmentProposalService.resolveProposedCommitmentsForTurn(
                {
                  userId,
                  riskLevel,
                  isCrisis,
                  userContent: messageText,
                  assistantContent: response.content,
                  sessionIntention: conversation?.sessionIntention,
                  conversationId: conversation._id,
                  assistantMessageId: assistantMessage._id,
                  interventionId: turnEnhancements.suggestionPlan?.primaryPsychoeducationId || null,
                  language: socketLanguage,
                },
                { transport: 'socket' },
              );

        await persistProposedCommitmentsOnMessage(
          assistantMessage._id,
          proposedCommitments,
        ).catch(() => {});
        
        const clientTurn = buildClientTurnPayload({
          tccLitePlan: turnEnhancements.tccLitePlan,
          suggestionPlan: turnEnhancements.suggestionPlan,
          language: socketLanguage,
          riskLevel,
          userMessage: messageText,
          commitmentFollowUpPlan: turnEnhancements.commitmentFollowUpPlan,
          showCommitmentFollowUpChips,
          experientialFollowUpPlan: turnEnhancements.experientialFollowUpPlan,
          showExperientialFollowUpChips,
        });
        const interactiveCanvas = await resolveInteractiveCanvasForTurn({
          toolCanvas: response.context?.toolProposedInteractiveCanvas,
          conversationId: conversation._id,
          assistantMessageId: assistantMessage._id,
          userId,
          transport: 'socket',
        });
        const turnOut = finalizeTurnPayload(
          applyInteractiveCanvasCompetition(
            {
              suggestions: clientTurn.suggestions,
              suggestionsPersonalized: clientTurn.suggestionsPersonalized,
              proposedProductActions,
              proposedCommitments,
              commitmentFollowUp: clientTurn.commitmentFollowUp,
              experientialFollowUp: clientTurn.experientialFollowUp,
              tccLite: clientTurn.tccLite,
            },
            interactiveCanvas,
          ),
          response.context,
        );
        // 9. Emitir respuesta al cliente
        metricsService
          .recordMetric(
            'chat_usage',
            {
              action: 'streaming_done',
              isGuest: false,
              timeToDoneMs: Date.now() - turnStartTime,
            },
            userId.toString(),
            {
              conversationId: String(conversation._id),
              transport: 'socket',
              endpoint: 'chat',
              surface: 'registered',
              streaming: true,
            },
          )
          .catch(() => {});

        socket.emit(SOCKET_EVENTS.AI_TYPING, false);
        const socketDonePayload = withSessionTone({
            id: assistantMessage._id.toString(),
            text: response.content,
            userId: currentUserId,
            conversationId: conversation._id.toString(),
            timestamp: new Date(),
            proposedProductActions: turnOut.proposedProductActions,
            proposedCommitments: turnOut.proposedCommitments,
            productActionStatus: interactiveCanvas
              ? { paused: false, reason: null, askFirst: false }
              : productActionStatus,
            suggestions: turnOut.suggestions,
            suggestionsPersonalized: turnOut.suggestionsPersonalized,
            tccLite: turnOut.tccLite,
            commitmentFollowUp: turnOut.commitmentFollowUp,
            experientialFollowUp: turnOut.experientialFollowUp,
            interactiveCanvas: turnOut.interactiveCanvas || null,
            listedHabits: turnOut.listedHabits ?? null,
            proposedScaleCheckin: turnOut.proposedScaleCheckin ?? null,
            openSavedDecision: turnOut.openSavedDecision ?? null,
            ...buildSocketCrisisPayload(),
          });
        noteTurnTraceShadow(turnTrace, {
          choice: 'implicit_llm',
          constraints: turnPolicy.muteFlags,
          payload: socketDonePayload,
        });
        emitTurnTraceDecisionShadowed(turnTrace);
        socket.emit(
          SOCKET_EVENTS.MESSAGE_RECEIVED,
          socketDonePayload,
        );
        
        console.log(
          `[SocketIO] Mensaje procesado para usuario ${currentUserId}` +
            ` preLlm=${preLlmEndAt - turnStartTime}ms` +
            ` ttft=${firstChunkAt ? firstChunkAt - turnStartTime : 'n/a'}ms` +
            ` llm=${firstChunkAt && streamDoneAt ? streamDoneAt - firstChunkAt : streamDoneAt ? streamDoneAt - preLlmEndAt : 'n/a'}ms` +
            ` postLlm=${Date.now() - (streamDoneAt || preLlmEndAt)}ms` +
            ` total=${Date.now() - turnStartTime}ms` +
            ` ragJoin=${ragJoinStatus}` +
            (ragJoinMeta.ragMs != null ? ` ragMs=${ragJoinMeta.ragMs}` : '') +
            ` phenotypeJoin=${phenotypeJoinMeta.joinStatus || 'miss'}` +
            ` abcJoin=${abcJoinMeta.joinStatus || 'miss'}` +
            ` commitmentJoin=${commitmentJoinMeta.joinStatus || 'miss'}` +
            ` expFuJoin=${expFuJoinMeta.joinStatus || 'miss'}` +
            ` recallJoin=${recallJoinMeta.joinStatus || 'miss'}` +
            ` phases=${Object.entries(phaseMs)
              .map(([k, v]) => `${k}:${v}`)
              .join(',')}`,
        );
        
        } finally {
          if (turnLockOwner) {
            await releaseConversationTurnLock(conversation._id, turnLockOwner).catch(() => {});
          }
        }
      } catch (error) {
        console.error('[SocketIO] Error en el manejo del mensaje:', error);
        emitTurnTraceFailed(turnTrace, {
          errorCode: error?.code || error?.status || 'socket_message_error',
        });
        if (userMessage?._id) {
          await persistAssistantFallbackForUserMessage({
            userMessage,
            conversationId: userMessage.conversationId,
            userId: userMessage.userId,
            fallbackContent: assistantFallbackCopy || chatApiCopy('es').assistantProcessingFallback,
          }).catch(() => {});
        }
        socket.emit(SOCKET_EVENTS.AI_TYPING, false);
        socket.emit(SOCKET_EVENTS.ERROR, buildSocketChatErrorPayload(error));
      }
    });
    
    /**
     * Cancelar respuesta en proceso
     * Permite al usuario cancelar una respuesta que se está generando
     */
    socket.on(SOCKET_EVENTS.CANCEL_RESPONSE, () => {
      if (socket._chatTurnControl) {
        socket._chatTurnControl.aborted = true;
      }
      if (responseTimeout) {
        clearTimeout(responseTimeout);
        responseTimeout = null;
      }
      socket.emit(SOCKET_EVENTS.AI_TYPING, false);
      console.log(`[SocketIO] Respuesta cancelada por usuario ${currentUserId}`);
    });
    
    /**
     * Manejo de desconexión
     * Limpia recursos y notifica la desconexión
     */
    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      // No abortar la generación: el asistente debe persistir aunque el cliente se desconecte.
      if (responseTimeout) {
        clearTimeout(responseTimeout);
        responseTimeout = null;
      }
      
      // Salir de la sala del usuario
      if (currentUserId) {
        socket.leave(currentUserId);
        console.log(`[SocketIO] Usuario ${currentUserId} desconectado del socket ${socket.id}`);
      } else {
        console.log(`[SocketIO] Usuario desconectado: ${socket.id}`);
      }
    });
  });

  // Exportar instancia de io y eventos para uso en otros módulos
  io.SOCKET_EVENTS = SOCKET_EVENTS;
  
  return io;
};

// Helper: Emitir evento de alerta de emergencia a un usuario específico
export const emitEmergencyAlert = (io, userId, alertData) => {
  if (!io || !userId) {
    console.error('[SocketIO] No se puede emitir alerta: io o userId no válidos');
    return;
  }
  
  try {
    io.to(userId.toString()).emit(SOCKET_EVENTS.EMERGENCY_ALERT_SENT, {
      ...alertData,
      timestamp: new Date().toISOString()
    });
    console.log(`[SocketIO] ✅ Alerta de emergencia emitida a usuario ${userId}`);
  } catch (error) {
    console.error('[SocketIO] Error emitiendo alerta de emergencia:', error);
  }
};
