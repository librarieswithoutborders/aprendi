import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ResponsiveEmbed from 'react-responsive-embed'
const $ = require('jquery')

import PdfViewer from './PdfViewer'

const Resource = ({content, nextPrevFunctions, deleteResource, removeResource, updateResource, toggleShared}) => {
  let renderedContent
  switch (content.resource_type) {
    case 'pdf':
      renderedContent = renderPdf(content)
      break
    case 'image':
      renderedContent = renderImage(content)
      break
    case 'video':
      renderedContent = renderVideo(content)
      break
    case 'rich_text':
      renderedContent = renderRichText(content)
      break
    case 'embed':
      renderedContent = renderEmbed(content)
      break
    case 'website':
      renderedContent = renderWebsite(content)
      break
  }

  return (
    <div className="resource">
      <div className="resource__content">
        {renderedContent}
        {(content.disclaimer_message || content.more_info) &&
          <div className="resource__footer">
            {content.disclaimer_message &&
              <div className="resource__disclaimer">
                <div className="resource__disclaimer__content" dangerouslySetInnerHTML={{__html: content.disclaimer_message}} />
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
  if (!resource_url) {
    return null
  }
  let videoContent;
  if (video_provider == 'youtube') {
    videoContent = (
      <ResponsiveEmbed id="ytplayer" type="text/html" src={`${resource_url}?autoplay=1`} frameborder="0" allow="autoplay; encrypted-media" />
    )
  } else {
    videoContent = (
      <ResponsiveEmbed src={resource_url} allow="autoplay; encrypted-media" />
    )
  }
  return (
    <div className="resource__content__video" style={{paddingBottom: '56.25%'}}>
      {videoContent}
    </div>
  )
}

const renderRichText = ({rich_text_content}) => <div className="resource__content__richtext" dangerouslySetInnerHTML={{__html: rich_text_content}} />

const renderPdf = ({resource_url}) => <PdfViewer url={resource_url} />

const renderImage = ({image_url}) => (
  <div className="resource__content__image">
    <img className="resource__content__image__image-container" src={image_url} />
  </div>
)

const renderWebsite = ({resource_url, image_url}) => (
  <div className="resource__content__website">
    <a target="_blank" href={resource_url.substring(0, 4) != 'http' ? `//${resource_url}` : resource_url} className="resource__content__website__text-link">
      <h5 className="resource__content__website__text-link__text">{`Visit ${resource_url}`}</h5>
    </a>
    <a target="_blank" href={resource_url.substring(0, 4) != 'http' ? `//${resource_url}` : resource_url} className="resource__content__website__image-link">
      <img className="resource__content__website__screenshot" src={image_url} />
    </a>
  </div>
)

const renderEmbed = ({resource_url}) => <ResponsiveEmbed src={resource_url} allowfullscreen />

export default Resource
