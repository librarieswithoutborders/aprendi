import React from 'react';
import RichTextEditor from 'react-rte';
import { FormField } from 'react-form';

class RichTextFieldContent extends React.Component {
  constructor(props) {
    super(props)
    const { getValue } = props.fieldApi;
    let currValue = getValue()
    this.state = {
      content: RichTextEditor.createValueFromString(currValue ? currValue : "", 'html')
    }
  }

  onChange(value) {
    let formattedValue = value.toString('html')
    this.props.fieldApi.setValue(formattedValue)
    this.setState({
      content: value
    });

  }

  render() {

    return(
      <RichTextEditor
        value={this.state.content}
        onChange={(value) => this.onChange(value)}
      />
    );
  }
}


// Use the form field and your custom input together to create your very own input!
const RichTextField = FormField(RichTextFieldContent);

export default RichTextField
