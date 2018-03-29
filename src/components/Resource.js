import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PdfViewer from './PdfViewer'
import ResponsiveEmbed from 'react-responsive-embed'
const $ = require('jquery')

const Resource = ({content, nextPrevFunctions, deleteResource, removeResource, updateResource, toggleShared}) => {
  console.log(content)
  let renderedContent
  switch(content.resource_type) {
    case "pdf":
      renderedContent = renderPdf(content)
      break
    case "image":
      renderedContent = renderImage(content)
      break
    case "video":
      renderedContent = renderVideo(content)
      break
    case "rich_text":
      renderedContent = renderRichText(content)
      break
    case "embed":
      renderedContent = renderEmbed(content)
      break
    case "website":
      renderedContent = renderWebsite(content)
      break
  }

  return (
    <div className="resource">
      <div className="resource__header">
        <div className="resource__header__content">
          <h1 className="resource__header__text">{content.title}</h1>
          <div className="resource__header__button-container">
            {updateResource &&
              <h5 className="resource__header__button" onClick={() => updateResource(content)}>Edit Resource</h5>
            }
            {removeResource &&
              <h5 className="resource__header__button" onClick={() => removeResource(content)}>Remove Resource From Collection</h5>
            }
            {deleteResource &&
              <h5 className="resource__header__button" onClick={() => deleteResource(content)}>Delete Resource</h5>
            }
          </div>
        </div>
      </div>
      <div className="resource__content">
        {renderedContent}
        {(content.disclaimer_message || content.more_info) &&
          <div className="resource__footer">
            {content.disclaimer_message &&
              <div className="resource__disclaimer">
                <div className="resource__disclaimer__content" dangerouslySetInnerHTML={{__html:content.disclaimer_message}} />
              </div>
            }
            {content.more_info &&
              <div className="resource__more-info">
                <span>For more information visit: </span>
                <a href={content.more_info} target="_blank">{content.more_info}</a>
              </div>
            }
          </div>
        }
      </div>
    </div>
  )
}

const renderVideo = ({video_provider, resource_url}) => {
  if (!resource_url) { return null }
  let videoContent;
  if (video_provider == "youtube") {
    videoContent = (
      <ResponsiveEmbed src={resource_url} frameborder="0" allow="autoplay; encrypted-media" />
    )
  } else {
    videoContent = (
      <ResponsiveEmbed src={resource_url} frameborder="0" allow="autoplay; encrypted-media" />
    )
  }
  return (
    <div className="resource__content__video">
      {videoContent}
    </div>
  )
}

const renderRichText = ({rich_text_content}) => {
  return <div className="resource__content__richtext" dangerouslySetInnerHTML={{__html: rich_text_content}} />
}

const renderPdf = ({resource_url}) => {
  return <PdfViewer url={resource_url} />
}

const renderImage = ({image_url}) => {
  return (
    <div className="resource__content__image">
      <img className="resource__content__image__image-container" src={image_url} />
    </div>
  )
}

const renderWebsite = ({resource_url, image_url}) => {

  return (
    <div className="resource__content__website">
      <a target="_blank" href={resource_url} className="resource__content__website__image-link">
        <img className="resource__content__website__screenshot" src={image_url} />
      </a>
    </div>
  )
}

const renderEmbed = ({resource_url}) => {

  return <ResponsiveEmbed src={resource_url} allowfullscreen />
}

export default Resource
