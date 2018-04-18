import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form} from 'react-form'

import AdminFormField from './AdminFormField'

import {takeWebScreenshot, checkExternalSiteHeaders} from '../../actions/index'
import {fetchTeamList} from '../../actions/team'
import {fetchCollectionList} from '../../actions/collection'
import {fetchResourceList, fetchSharedResourceList} from '../../actions/resource'

import {teamFieldSettings, collectionFieldSettings, subcollectionFieldSettings, resourceFieldSettings} from '../../utils/formFieldSettings'
import processFormData from '../../utils/processFormData'
import processExternalSiteUrl from '../../utils/processExternalSiteUrl'
import convertToUrlPath from '../../utils/convertToUrlPath'


class AdminForm extends Component {
  constructor(props) {
    super(props)

    switch (props.type) {
      case 'team':
        this.fieldSettings = teamFieldSettings
        break;
      case 'collection':
        this.fieldSettings = collectionFieldSettings
        break;
      case 'subcollection':
        this.fieldSettings = subcollectionFieldSettings
        break;
      case 'resource':
        this.fieldSettings = resourceFieldSettings
        break;
    }

    this.state = {
    }
  }

  componentWillMount() {
    const {checkLocallyUniqueList, fetchCheckLocallyUniqueList, checkGloballyUniqueList, fetchCheckGloballyUniqueList, forceFetchLocallyUniqueList} = this.props

    if (forceFetchLocallyUniqueList || (fetchCheckLocallyUniqueList && !checkLocallyUniqueList)) {
      fetchCheckLocallyUniqueList()
    }

    if (fetchCheckGloballyUniqueList && !checkGloballyUniqueList) {
      fetchCheckGloballyUniqueList()
    }
  }

  checkUnique(level, field, value) {
    const {checkLocallyUniqueList, checkGloballyUniqueList} = this.props
    const checkUniqueList = level === 'local' ? checkLocallyUniqueList : checkGloballyUniqueList

    if (!checkUniqueList) {
      return `Server Error: Unable to validate ${field}`
    }

    const foundVal = checkUniqueList.find(d => {
      console.log(d[field], value, d[field] === value); return d[field] === value
    })

    return foundVal ? `This ${field} is already taken.  Please try a different value` : null
  }

  checkSharedValuePath(formApi, value) {
    if (value && formApi.values.shared) {
      return this.checkUnique('global', 'path', value)
    }

    return null
  }

  submitForm(formData, a, formApi) {
    const {data, action, team, resourceType, takeWebScreenshot} = this.props

    console.log('THIS IS THE FORM DATA')
    console.log(formData)

    const values = {}
    Object.assign(values, formData)
    if (team) {
      values.team = team
    }

    if (resourceType) {
      values.resource_type = resourceType
    }

    if ((values.resource_type === 'website' || values.resource_type === 'embed') && (!data || data.resource_url != formData.resource_url)) {
      takeWebScreenshot(processExternalSiteUrl(formData.resource_url), d => {
        values.image_url = `https://s3.us-east-2.amazonaws.com/mylibraryguide-assets/images/${d}`
        processFormData(values, action).then(result => {
          console.log(result); this.props.submit(result)
        })
      })
    } else {
      processFormData(values, action).then(result => {
        console.log(result); this.props.submit(result)
      })
    }
  }

  submitFormFailure(err) {
    console.log(err)
  }

  populatePath(values) {
    console.log('POPULATING PATH')
    console.log(values)

    if (!values.path) {
      values.path = convertToUrlPath(values.title || values.team_name)
    }

    console.log(values)

    return values
  }

  renderFormFields(formApi) {
    const {errors, values} = formApi
    const {isCoreAdmin, action, resourceType, type} = this.props

    const fields = []

    this.fieldSettings.forEach(settings => {
      if (!settings.showOnly || (settings.showOnly && settings.showOnly({isCoreAdmin: isCoreAdmin, action: action, resourceType: resourceType || values.resource_type}))) {
        fields.push(
          <AdminFormField
            key={settings.dbField}
            settings={settings}
            error={errors ? errors[settings.dbField] : null}
            checkLocallyUnique={({field, value}) => this.checkUnique('local', field, value)}
            checkGloballyUnique={type === 'resource' && settings.dbField === 'path' ? ({value}) => this.checkSharedValuePath(formApi, value) : ({field, value}) => this.checkUnique('global', field, value)}/>
        )
      }
    })

    return (
      <div className="form__contents">
        {fields}
      </div>
    )
  }

  render() {
    const {type, data, action, updateStatus} = this.props

    return (
      <Form
        onSubmit={(submittedValues, a, formApi) => this.submitForm(submittedValues, a, formApi)}
        defaultValues={data}
        preSubmit={values => this.populatePath(values)}>
        { formApi => {
          const {errors} = formApi

          return (
            <form id="form" onSubmit={formApi.submitForm}>
              {this.renderFormFields(formApi)}
              <div className="form__submit-container">
                <button type="submit" className="button button-blue form__submit">Submit</button>
              </div>
            </form>
          )
        }
        }
      </Form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {type, data} = ownProps
  const {currUser, currTeam, adminModalContent, currCollection, collectionList, resourceList, teamList, sharedResourceList} = state
  let checkLocallyUniqueList, checkGloballyUniqueList;

  if (type === 'team') {
    checkGloballyUniqueList = teamList
  } else if (type === 'collection') {
    checkGloballyUniqueList = collectionList
    checkLocallyUniqueList = collectionList ? collectionList.filter(d => d.team && d.team._id === currTeam._id) : null
  } else if (type === 'subcollection') {
    if (adminModalContent.parent && adminModalContent.parent.parentData) {
      checkLocallyUniqueList = adminModalContent.parent.parentData.subcollections
    }
  } else if (type === 'resource') {
    checkLocallyUniqueList = currTeam && currTeam.resources ? currTeam.resources : []
    checkLocallyUniqueList = sharedResourceList ? [...sharedResourceList, ...checkLocallyUniqueList] : checkLocallyUniqueList
    checkGloballyUniqueList = resourceList
  }

  console.log('got to here!')

  // in order to ensure that the check unique list does not contain the element itself
  if (data) {
    checkLocallyUniqueList = checkLocallyUniqueList ? checkLocallyUniqueList.filter(d => d._id !== data._id) : null
    checkGloballyUniqueList = checkGloballyUniqueList ? checkGloballyUniqueList.filter(d => d._id !== data._id) : null
  }

  return {
    isCoreAdmin: currUser && currUser.permissions && currUser.permissions.core_admin,
    checkLocallyUniqueList: checkLocallyUniqueList,
    checkGloballyUniqueList: checkGloballyUniqueList,
    // to ensure that the share resource list is loaded when checking resources
    forceFetchLocallyUniqueList: type === 'resource' && (!sharedResourceList || sharedResourceList.length === 0) ? true : false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {type} = ownProps
  let fetchCheckLocallyUniqueList, fetchCheckGloballyUniqueList, checkUnique;

  if (type === 'team') {
    fetchCheckGloballyUniqueList = () => dispatch(fetchTeamList())
  } else if (type === 'collection') {
    fetchCheckLocallyUniqueList = () => dispatch(fetchCollectionList())
    fetchCheckGloballyUniqueList = () => dispatch(fetchCollectionList())
  } else if (type === 'subcollection') {
  } else if (type === 'resource') {
    fetchCheckLocallyUniqueList = () => dispatch(fetchSharedResourceList())
    fetchCheckGloballyUniqueList = () => dispatch(fetchResourceList())
  }

  return {
    takeWebScreenshot: (url, callback) => {
      dispatch(takeWebScreenshot(url, callback))
    },
    fetchCheckLocallyUniqueList: fetchCheckLocallyUniqueList,
    fetchCheckGloballyUniqueList: fetchCheckGloballyUniqueList
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminForm)
