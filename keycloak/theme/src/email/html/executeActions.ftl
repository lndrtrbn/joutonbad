<#outputformat "plainText">
<#assign requiredActionsText><#if requiredActions??><#list requiredActions><#items as reqActionItem>${msg("requiredAction.${reqActionItem}")}<#sep>, </#sep></#items></#list></#if></#assign>
</#outputformat>

<#import "template.ftl" as layout>
<@layout.emailLayout>
<tr>
  <td style="width: 100%;">
    <#list requiredActions>
      <#items as reqActionItem>
        <#if reqActionItem == "VERIFY_EMAIL">
          <h3 style="margin: 0">Vérification de l'adresse mail</h3>
          <p>
            Tu viens de créer un compte pour gérer tes inscriptions aux tournois avec le club du REC Badminton.
            Afin de finaliser ton inscription, valide ton email avec le lien ci-dessous:
          </p>
          <p style="text-align: center"><a href="${link}">Valider mon adresse mail</a></p>
          <p>Si tu n'es pas à l'origine de la création du compte, ignore ce message.</p>
        <#if reqActionItem == "UPDATE_PASSWORD">
          <h3 style="margin: 0">Changement de mot de passe</h3>
          <p>
            Une demande de changement de mot de passe a été faite pour cette adresse mail.
            Tu peux changer ton mot de passe avec le lien ci-dessous:
          </p>
          <p style="text-align: center"><a href="${link}">Changer mon mot de passe</a></p>
          <p>Si tu n'es pas à l'origine de cette demande, ignore ce message.</p>
        <#else>
          <p>${kcSanitize(msg("executeActionsBodyHtml",link, linkExpiration, realmName, requiredActionsText, linkExpirationFormatter(linkExpiration)))?no_esc}</p>
        </#if>
      </#items>
    </#list>
  </td>
</tr>
</@layout.emailLayout>
