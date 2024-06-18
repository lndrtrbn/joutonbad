<#ftl output_format="plainText">
<#assign requiredActionsText><#if requiredActions??><#list requiredActions><#items as reqActionItem>${msg("requiredAction.${reqActionItem}")}<#sep>, </#items></#list><#else></#if></#assign>

<#list requiredActions>
  <#items as reqActionItem>
    <#if reqActionItem == "VERIFY_EMAIL">
      Vérification de l'adresse mail
      
      Tu viens de créer un compte pour gérer tes inscriptions aux tournois avec le club du REC Badminton.
      Afin de finaliser ton inscription, valide ton email avec le lien ci-dessous:

      ${link}

      Si tu n'es pas à l'origine de la création du compte, ignore ce message.
    <#if reqActionItem == "UPDATE_PASSWORD">
      Changement de mot de passe

      Une demande de changement de mot de passe a été faite pour cette adresse mail.
      Tu peux changer ton mot de passe avec le lien ci-dessous:
      
      ${link}

      Si tu n'es pas à l'origine de cette demande, ignore ce message.
    <#else>
      ${msg("executeActionsBody",link, linkExpiration, realmName, requiredActionsText, linkExpirationFormatter(linkExpiration))}
    </#if>
  </#items>
</#list>