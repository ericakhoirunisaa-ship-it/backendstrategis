import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private config: ConfigService) {}

  async kirimEmailKonfirmasi(email: string, nama: string) {
    const host = this.config.get<string>('MAIL_HOST');
    const user = this.config.get<string>('MAIL_USER');
    const pass = this.config.get<string>('MAIL_PASS');

    if (!host || !user || !pass) {
      this.logger.warn('Konfigurasi email belum diatur (MAIL_HOST/USER/PASS), notifikasi email dilewati.');
      return;
    }

    try {
      const transporter = nodemailer.createTransport({
        host,
        port: Number(this.config.get('MAIL_PORT') ?? 587),
        secure: false,
        auth: { user, pass },
        tls: { rejectUnauthorized: false },
      });

      const from = this.config.get('MAIL_FROM') ?? `BPS Toli-Toli <${user}>`;

      await transporter.sendMail({
        from,
        to: email,
        subject: '✅ Pengaduan Anda Diterima – BPS Kabupaten Toli-Toli',
        html: this.emailTemplate(nama),
      });

      this.logger.log(`Email konfirmasi terkirim ke ${email}`);
    } catch (err) {
      this.logger.error(`Gagal mengirim email ke ${email}: ${(err as Error).message}`);
    }
  }

  async kirimWhatsAppKonfirmasi(noTelpon: string, nama: string) {
    const token = this.config.get<string>('FONNTE_TOKEN');

    if (!token) {
      this.logger.warn('FONNTE_TOKEN belum diatur, notifikasi WhatsApp dilewati.');
      return;
    }

    try {
      const target = this.formatNomorID(noTelpon);
      const message = this.whatsappTemplate(nama);

      const res = await fetch('https://api.fonnte.com/send', {
        method: 'POST',
        headers: {
          token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ target, message, countryCode: '62' }).toString(),
      });

      const data = await res.json() as { status: boolean; detail?: string };
      if (data.status) {
        this.logger.log(`WhatsApp konfirmasi terkirim ke ${target}`);
      } else {
        this.logger.warn(`WhatsApp gagal: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      this.logger.error(`Gagal mengirim WhatsApp ke ${noTelpon}: ${(err as Error).message}`);
    }
  }

  private formatNomorID(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    if (digits.startsWith('62')) return digits;
    if (digits.startsWith('0')) return '62' + digits.slice(1);
    return '62' + digits;
  }

  private emailTemplate(nama: string): string {
    return `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,.07);">
        <tr>
          <td style="background:#0C2340;padding:28px 36px;text-align:center;">
            <p style="color:#38BDF8;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 6px;">BPS Kabupaten Toli-Toli</p>
            <h1 style="color:#fff;font-size:18px;font-weight:800;margin:0;">Portal Data Strategis</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:36px;">
            <div style="text-align:center;margin-bottom:20px;font-size:48px;">✅</div>
            <h2 style="color:#0C2340;font-size:18px;font-weight:800;text-align:center;margin:0 0 8px;">Pengaduan Berhasil Diterima</h2>
            <p style="color:#64748B;font-size:13px;text-align:center;margin:0 0 24px;">Yth. Bapak/Ibu <strong style="color:#0C2340;">${nama}</strong>,</p>

            <div style="background:#F8FAFC;border-left:4px solid #1D6FCA;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
              <p style="color:#334155;font-size:13px;line-height:1.7;margin:0;">
                Pengaduan Anda telah <strong>berhasil kami terima</strong> dan tercatat dalam sistem BPS Kabupaten Toli-Toli.
                Tim kami akan segera menindaklanjuti laporan Anda dalam waktu <strong>1×24 jam kerja</strong>.
              </p>
            </div>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td style="padding:12px 16px;background:#F0FDF4;border-radius:8px;">
                  <p style="color:#94A3B8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 4px;">Status Pengaduan</p>
                  <p style="color:#059669;font-size:14px;font-weight:700;margin:0;">● Sedang Diproses</p>
                </td>
              </tr>
            </table>

            <p style="color:#64748B;font-size:12px;line-height:1.7;margin:0 0 24px;">
              Jika ada pertanyaan lebih lanjut, Anda dapat menghubungi BPS Kabupaten Toli-Toli
              melalui telepon atau mengunjungi kantor kami secara langsung.
            </p>

            <div style="border-top:1px solid #E2E8F0;padding-top:20px;text-align:center;">
              <p style="color:#CBD5E1;font-size:11px;margin:0;">© 2025 BPS Kabupaten Toli-Toli · Jl. Basuki Rahmat No.1, Toli-Toli</p>
              <p style="color:#CBD5E1;font-size:11px;margin:4px 0 0;">Email ini dikirim otomatis, mohon tidak membalas.</p>
            </div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
  }

  private whatsappTemplate(nama: string): string {
    return `Halo Bapak/Ibu *${nama}* 👋

✅ *Pengaduan Anda Telah Diterima*

Terima kasih telah menyampaikan pengaduan kepada BPS Kabupaten Toli-Toli.

Pengaduan Anda telah tercatat dalam sistem kami dan akan segera ditindaklanjuti oleh petugas dalam waktu *1×24 jam kerja*.

📞 Pertanyaan lebih lanjut, hubungi kami:
📍 Jl. Basuki Rahmat No.1, Toli-Toli

Hormat kami,
*BPS Kabupaten Toli-Toli*
_Portal Data Strategis_`;
  }
}
