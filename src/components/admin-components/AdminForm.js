import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form} from 'react-form'

import AdminFormField from './AdminFormField'

import {takeWebScreenshot} from '../../actions/index'
import {fetchTeamList} from '../../actions/team'
import {fetchCollectionList} from '../../actions/collection'

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
    const {checkLocallyUniqueList, fetchCheckLocallyUniqueList, checkGloballyUniqueList, fetchCheckGloballyUniqueList} = this.props

    if (fetchCheckLocallyUniqueList && !checkLocallyUniqueList) {
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

    const foundVal = checkUniqueList.find(d => d[field].toLowerCase() === value.toLowerCase())

    return foundVal ? `This ${field} is already taken.  Please try a different value` : null
  }

  submitForm(formData) {
    const {data, action, team, resourceType, takeWebScreenshot} = this.props
    const resourceUrlChanged = !data || data.resource_url !== formData.resource_url
    const imageUrlChanged = !data || data.image_url !== formData.image_url
    const values = {}
    Object.assign(values, formData)
    if (team) {
      values.team = team
    }

    if (resourceType) {
      values.resource_type = resourceType
    }

    if ((values.resource_type === 'website' || values.resource_type === 'embed') && resourceUrlChanged) {
      takeWebScreenshot(processExternalSiteUrl(formData.resource_url), d => {
        values.image_url = d
        processFormData(values, action, resourceUrlChanged, imageUrlChanged).then(result => {
          this.props.submit(result)
        })
      })
    } else {
      processFormData(values, action, resourceUrlChanged, imageUrlChanged).then(result => {
        this.props.submit(result)
      })
    }
  }

  submitFormFailure(err) {
    console.log(err)
  }

  populatePath(values) {
    if (!values.path) {
      values.path = convertToUrlPath(values.title || values.team_name)
    }

    return values
  }

  renderFormFields(formApi) {
    const {errors, values} = formApi
    const {isCoreAdmin, action, resourceType} = this.props

    const fields = []

    this.fieldSettings.forEach(settings => {
      if (!settings.showOnly || (settings.showOnly && settings.showOnly({isCoreAdmin: isCoreAdmin, action: action, resourceType: resourceType || values.resource_type}))) {
        fields.push(
          <AdminFormField
            key={settings.dbField}
            settings={settings}
            error={errors ? errors[settings.dbField] : null}
            checkLocallyUnique={({field, value}) => this.checkUnique('local', field, value)}
            checkGloballyUnique={({field, value}) => this.checkUnique('global', field, value)}/>
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
    const {data} = this.props

    return (
      <Form
        onSubmit={(submittedValues, a, formApi) => this.submitForm(submittedValues, a, formApi)}
        defaultValues={data}
        preSubmit={values => this.populatePath(values)}>
        {formApi => (
          <form id="form" onSubmit={formApi.submitForm}>
            {this.renderFormFields(formApi)}
            <div className="form__submit-container">
              <button type="submit" className="button button-blue form__submit">Submit</button>
            </div>
          </form>
        )}
      </Form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {type, data} = ownProps
  const {currUserPermissions, currTeam, adminModalContent, collectionList, teamList} = state
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
    if (currTeam && currTeam.resources) {
      checkLocallyUniqueList = currTeam.resources
    }
  }

  // in order to ensure that the check unique list does not contain the element itself
  if (data) {
    checkLocallyUniqueList = checkLocallyUniqueList ? checkLocallyUniqueList.filter(d => d._id !== data._id) : null
    checkGloballyUniqueList = checkGloballyUniqueList ? checkGloballyUniqueList.filter(d => d._id !== data._id) : null
  }

  return {
    isCoreAdmin: currUserPermissions && currUserPermissions.core_admin,
    checkLocallyUniqueList: checkLocallyUniqueList,
    checkGloballyUniqueList: checkGloballyUniqueList
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {type} = ownProps
  let fetchCheckLocallyUniqueList, fetchCheckGloballyUniqueList

  if (type === 'team') {
    fetchCheckGloballyUniqueList = () => dispatch(fetchTeamList())
  } else if (type === 'collection') {
    fetchCheckLocallyUniqueList = () => dispatch(fetchCollectionList())
    fetchCheckGloballyUniqueList = () => dispatch(fetchCollectionList())
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
