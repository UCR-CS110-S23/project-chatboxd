import react from "react";
import { Button, TextField } from "@mui/material";
import '../Styles/Form.css'

class Form extends react.Component{
    constructor(props){
        super(props);
        // for each item in props.fields, create an item in this.state.fields
        let fields = [];
        for (let i = 0; i < props.fields.length; i++) {
            fields.push(["", props.fields[i]]);
        }
        this.state = {
            fields: fields,
        }
    }

    handleChange = (event, index) => {
        let fields = this.state.fields;
        fields[index][0] = event.target.value;
        this.setState({fields: fields});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let fields = this.state.fields;
        let data = {};
        for (let i = 0; i < fields.length; i++) {
            data[fields[i][1]] = fields[i][0];
        }
        this.props.submit(data);
    }

    render() {
        return (
          <div className="form-container">
            <div className="form-header">
              <Button className="form-close-button" onClick={this.props.close}>
                x
              </Button>
              <h3 className="form-title">{this.props.type}</h3>
            </div>
    
            <form onSubmit={this.handleSubmit}>
              <div className="form-fields">
                {this.state.fields.map((field, index) => {
                  return (
                    <div className="form-field" key={"auth" + field[1]}>
                      <TextField
                        variant="standard"
                        label={field[1]}
                        onChange={(event) => this.handleChange(event, index)}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="form-submit">
                <input
                  type="submit"
                  value="Submit"
                  className="form-submit-button"
                />
              </div>
            </form>
          </div>
        );
      }
}

export default Form;