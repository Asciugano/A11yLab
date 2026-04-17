type CertData = {
  name: string;
  email: string;
  course: string;
  date: string;
  colors: { from: string; to: string };
};

function generateColorFromCourseName(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue1 = hash % 360;
  const hue2 = (hash + 60) % 360;

  return {
    from: `hsl(${hue1}, 70%, 50%)`,
    to: `hsl(${hue2}, 70%, 40%)`,
  };
}

export function generateCertificateFromHTML(data: CertData) {
  data.colors = generateColorFromCourseName(data.course);
  return `
  <html>
    <head>
      <style>
        body {
          margin: 0;
          font-family: sans-serif;
        }

        .container {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to right, ${data.colors.from}, ${data.colors.to});
          color: white;
          text-align: center;
        }

        .card {
          background: rgba(0,0,0,0.4);
          padding: 60px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        h1 {
          font-size: 40px;
          margin-bottom: 20px;
        }

        h2 {
          margin: 10px 0;
        }

        .meta {
          margin-top: 30px;
          font-size: 14px;
          opacity: 0.8;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <h1>Certificato di completamento</h1>
          <h2>Corso: ${data.course}</h2>

          <p>Conferito a</p>
          <h2>Nome: ${data.name}</h2>
          <p>Email: ${data.email}</p>

          <div class="meta">
            <p>Data: ${data.date}</p>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
}
