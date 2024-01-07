export const emailTemplate = ({ name, htmlMessage }) => {
  const currentYear = new Date().getFullYear();
  return `<!DOCTYPE html>
    <html>
    <head>
        <title>Aposkal Email</title>
        <style type="text/css">
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #ffffff;
            }
            .container {
                width: 600px;
                margin: 0 auto;
                background-color: #f7f7f7;
                padding: 20px;
                border: 1px solid #dddddd;
                box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
            }
            .header {
                background-color: #f7f7f7;
                color: #ffffff;
                padding: 10px;
                text-align: center;
            }
            .header img {
                max-width: 100%;
                height: auto;
            }
            .content {
                padding: 20px;
            }
            .footer {
                background-color: #04B5A6;
                color: #ffffff;
                text-align: center;
                padding: 5px;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://www.aposkal.com/_next/static/media/logo.447d83e9.svg" style="width:150px;" alt="Aposkal Logo">
            </div>
            <div class="content">

                <br>
                ${htmlMessage}
               
            </div>
            <div class="footer">
                &copy; ${currentYear} Aposkal. All rights reserved.
            </div>
        </div>
    </body>
    </html>`;
};
