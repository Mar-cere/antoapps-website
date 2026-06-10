import { formatAndroidLeadTelegramMessage, type AndroidLeadContext } from '@/lib/android-early-access/lead-context';

export async function notifyAndroidLead(input: AndroidLeadContext): Promise<void> {
  const webhookUrl = process.env.ANDROID_EARLY_ACCESS_WEBHOOK_URL;
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  const message = formatAndroidLeadTelegramMessage(input);

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'android_early_access_new_lead',
          ...input,
          message,
        }),
      });
    } catch (error) {
      const err = error instanceof Error ? error.message : 'unknown_webhook_error';
      console.error('[android-early-access][notify_webhook_error]', { err });
    }
  }

  if (telegramBotToken && telegramChatId) {
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
        }),
      });
    } catch (error) {
      const err = error instanceof Error ? error.message : 'unknown_telegram_error';
      console.error('[android-early-access][notify_telegram_error]', { err });
    }
  }
}
