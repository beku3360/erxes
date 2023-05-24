export const clientPortalGetConfig = `
  query clientPortalGetConfigByDomain {
    clientPortalGetConfigByDomain {
      _id
      name
      description
      logo
      icon
      headerHtml
      footerHtml
      url
      messengerBrandCode
      knowledgeBaseLabel
      knowledgeBaseTopicId
      taskLabel
      taskPublicPipelineId
      taskPipelineId
      taskStageId
      dealLabel
      dealPipelineId
      dealStageId
      purchaseLabel
      purchasePipelineId
      purchaseStageId
      ticketLabel
      ticketStageId
      ticketPipelineId
      publicTaskToggle
      ticketToggle
      taskToggle
      dealToggle
      purchaseToggle
      kbToggle
      googleClientId
      facebookAppId
      erxesAppToken

      styles {
        bodyColor
        headerColor
        footerColor
        helpColor
        backgroundColor
        activeTabColor
        baseColor
        headingColor
        linkColor
        linkHoverColor
        baseFont
        headingFont
        dividerColor
        primaryBtnColor
        secondaryBtnColor
      }
    }
  }
`;
