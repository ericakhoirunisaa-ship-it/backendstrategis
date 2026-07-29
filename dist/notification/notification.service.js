"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
let NotificationService = NotificationService_1 = class NotificationService {
    config;
    logger = new common_1.Logger(NotificationService_1.name);
    constructor(config) {
        this.config = config;
    }
    async kirimEmailKonfirmasi(email, nama) {
        const host = this.config.get('MAIL_HOST');
        const user = this.config.get('MAIL_USER');
        const pass = this.config.get('MAIL_PASS');
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
        }
        catch (err) {
            this.logger.error(`Gagal mengirim email ke ${email}: ${err.message}`);
        }
    }
    async kirimWhatsAppKonfirmasi(noTelpon, nama) {
        const token = this.config.get('FONNTE_TOKEN');
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
            const data = await res.json();
            if (data.status) {
                this.logger.log(`WhatsApp konfirmasi terkirim ke ${target}`);
            }
            else {
                this.logger.warn(`WhatsApp gagal: ${JSON.stringify(data)}`);
            }
        }
        catch (err) {
            this.logger.error(`Gagal mengirim WhatsApp ke ${noTelpon}: ${err.message}`);
        }
    }
    formatNomorID(phone) {
        const digits = phone.replace(/\D/g, '');
        if (digits.startsWith('62'))
            return digits;
        if (digits.startsWith('0'))
            return '62' + digits.slice(1);
        return '62' + digits;
    }
    emailTemplate(nama) {
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
    whatsappTemplate(nama) {
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
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map