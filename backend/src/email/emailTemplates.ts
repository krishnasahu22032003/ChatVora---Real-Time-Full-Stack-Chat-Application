export function createWelcomeEmailTemplate(name: string, clientURL: string) {
  const escape = (str: string) =>
    str.replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[m]!));

  const safeName = escape(name);
  const safeURL = escape(clientURL);

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to ChatVora</title>
  </head>
  <body style="margin:0;padding:0;background:#020617;
               font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
               color:#f8fafc;">

    <!-- Background spacer to prevent clipping -->
    <div style="padding:60px 20px 80px 20px;">

      <!-- Outer Glow Wrapper -->
      <div style="max-width:640px;margin:0 auto;padding:3px;
                  background:linear-gradient(135deg,#06b6d4,#6366f1,#8b5cf6);
                  border-radius:24px;
                  box-shadow:0 0 45px rgba(99,102,241,0.25);
                  overflow:hidden;">

        <!-- Inner Glass Panel -->
        <div style="background:rgba(15,23,42,0.9);
                    backdrop-filter:blur(14px);
                    border-radius:22px;
                    padding:48px 42px;
                    border:1px solid rgba(255,255,255,0.08);">

          <!-- Header -->
          <div style="text-align:center;margin-bottom:40px;">
            <img src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png"
                 alt="ChatVora Logo"
                 width="90" height="90"
                 style="border-radius:50%;
                        background:rgba(255,255,255,0.9);
                        box-shadow:0 0 36px rgba(14,165,233,0.55);
                        padding:10px;"/>
            <h1 style="font-size:34px;font-weight:700;color:#ffffff;margin:25px 0 8px;">
              Welcome to <span style="background:linear-gradient(90deg,#60a5fa,#a78bfa);
                                      -webkit-background-clip:text;
                                      -webkit-text-fill-color:transparent;">ChatVora</span>
            </h1>
            <p style="color:#cbd5e1;font-size:15px;margin-top:6px;">
              The future of conversations — encrypted, intelligent, limitless.
            </p>
          </div>

          <!-- Body -->
          <p style="font-size:18px;font-weight:500;color:#38bdf8;">Hey ${safeName},</p>
          <p style="color:#e2e8f0;line-height:1.8;font-size:15px;margin-top:10px;">
            You’ve just entered <strong>ChatVora</strong> — where every message resonates in real-time 
            through a symphony of speed, design, and intelligence. We’re thrilled to have you aboard 
            our universe of meaningful communication.
          </p>

          <!-- Action Card -->
          <div style="margin:35px 0;padding:26px;border-radius:18px;
                      background:linear-gradient(135deg,rgba(30,64,175,0.25),rgba(8,145,178,0.25));
                      border:1px solid rgba(96,165,250,0.3);
                      box-shadow:0 10px 28px rgba(0,0,0,0.25);">
            <p style="font-weight:600;color:#93c5fd;margin-bottom:12px;">Begin your ChatVora journey:</p>
            <ul style="padding-left:18px;color:#cbd5e1;font-size:14px;line-height:1.8;margin:0;">
              <li>Customize your cosmic profile avatar 👤</li>
              <li>Discover and connect across digital galaxies 🌌</li>
              <li>Start your first intelligent chat 💬</li>
              <li>Experience blazing real-time messaging ⚡</li>
            </ul>
          </div>

          <!-- Button -->
          <div style="text-align:center;margin:45px 0;">
            <a href="${safeURL}" target="_blank" rel="noopener noreferrer"
               style="background:linear-gradient(90deg,#06b6d4,#6366f1,#8b5cf6);
                      color:#fff;text-decoration:none;
                      padding:15px 48px;border-radius:60px;
                      font-weight:600;letter-spacing:0.6px;
                      display:inline-block;
                      box-shadow:0 0 30px rgba(99,102,241,0.4),
                                 inset 0 0 12px rgba(255,255,255,0.15);
                      text-transform:uppercase;">
              Enter ChatVora ✨
            </a>
          </div>

          <!-- Closing -->
          <p style="color:#9ca3af;font-size:14px;line-height:1.8;margin-top:10px;">
            If you ever need help, guidance, or just want to share your thoughts — 
            we’re always listening.
          </p>
          <p style="margin-top:25px;color:#a5b4fc;font-size:14px;">
            With innovation and connection,<br>
            — The <span style="color:#60a5fa;">ChatVora</span> Team 💫
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align:center;color:#6b7280;font-size:12px;margin-top:40px;">
        <p>© 2025 <strong>ChatVora</strong>. Transcending communication.</p>
        <p>
          <a href="${safeURL}/privacy" style="color:#818cf8;text-decoration:none;margin:0 10px;">Privacy Policy</a> |
          <a href="${safeURL}/terms" style="color:#818cf8;text-decoration:none;margin:0 10px;">Terms</a> |
          <a href="${safeURL}/contact" style="color:#818cf8;text-decoration:none;margin:0 10px;">Contact</a>
        </p>
      </div>
    </div>
  </body>
  </html>
  `;
}
