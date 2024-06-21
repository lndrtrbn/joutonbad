<#import "template.ftl" as layout>
<@layout.emailLayout>
<tr>
  <td style="width: 100%; text-align: center">
    ${kcSanitize(msg("emailTestBodyHtml",realmName))?no_esc}
  </td>
</tr>
</@layout.emailLayout>
