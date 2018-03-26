import React from 'react';
import RichTextEditor from 'react-rte';
import { FormField } from 'react-form';
import richTextToolbarConfig from '../utils/richTextToolbarConfig'

class RichTextFieldContent extends React.Component {
  constructor(props) {
    super(props)
    const { getValue } = props.fieldApi;
    let currValue = getValue()
    this.state = {
      content: RichTextEditor.createValueFromString(currValue ? currValue : "", 'html'),
      active: false
    }
  }

  onChange(value) {
    let formattedValue = value.toString('html')
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
    const { active, content } = this.state
    return(
      <div className={active ? "form__field__rich-text active" : "form__field__rich-text"} tabIndex="0" onClick={() => this.setActive()}>
        <RichTextEditor
          value={content}
          onChange={(value) => this.onChange(value)}
          toolbarConfig={richTextToolbarConfig}
        />
      </div>
    );
  }
}


// Use the form field and your custom input together to create your very own input!
const RichTextField = FormField(RichTextFieldContent);

export default RichTextField
