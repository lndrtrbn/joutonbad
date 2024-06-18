<#macro emailLayout>
<html lang="en">
  <head>
    <link
      href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@160..700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      font-family: &quot;Readex Pro&quot;, sans-serif;
      margin-top: 50px;
    "
  >
    <table
      style="width: 95%; max-width: 600px; margin: 0 auto"
      border="0"
      cellspacing="0"
      cellpadding="0"
    >
      <tr>
        <td
          style="
            width: 100%;
            text-align: center;
            background: rgba(238, 238, 238, 0.5);
            padding: 12px;
            padding-bottom: 0;
          "
        >
          Joutonbad
        </td>
      </tr>
      <tr>
        <td
          style="
            width: 100%;
            text-align: center;
            background: rgba(238, 238, 238, 0.5);
            padding: 12px;
          "
        >
          <h2 style="margin: 0">REC Badminton</h2>
        </td>
      </tr>

      <td style="padding-top: 24px"></td>

      <#nested>

      <td style="padding-top: 24px"></td>

      <tr>
        <td
          style="
            width: 100%;
            text-align: center;
            background: rgba(238, 238, 238, 0.5);
            padding: 12px;
          "
        >
          <h5 style="margin: 0">Joutonbad</h5>
        </td>
      </tr>
    </table>
  </body>
</html>
</#macro>
