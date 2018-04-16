import React from 'react';
import RichTextEditor from 'react-rte';
import {Field} from 'react-form';

import {richTextToolbarConfig} from '../../constants'

class RichTextField extends React.Component {
  constructor(props) {
    super(props)

    const currValue = props.fieldApi.value
    this.state = {
      content: RichTextEditor.createValueFromString(currValue ? currValue : '', 'html'),
      active: false
    }
  }

  onChange(value) {
    const formattedValue = value.toString('html')
    this.props.fieldApi.setValue(formattedValue)
    this.setState({
      content: value
    });
  }

  setActive() {
    if (!this.state.active) {
      this.setState({
        active: true
      })
    }
  }

  render() {
    const {active, content} = this.state
    return (
      <div className={active ? 'form__field__rich-text active' : 'form__field__rich-text'} tabIndex="0" onClick={() => this.setActive()}>
        <RichTextEditor
          value={content}
          onChange={value => this.onChange(value)}
          toolbarConfig={richTextToolbarConfig}
        />
      </div>
    );
  }
}

const RichTextFieldContainer = ({field}) => (
  <Field field={field}>
    {fieldApi =>
      <RichTextField fieldApi={fieldApi} />
    }
  </Field>
)

export default RichTextFieldContainer
