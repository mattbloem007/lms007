import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';


class Dates extends Component {

  constructor(props) {
    super(props);
  }

  handleNext = (form) => {
    let info = {
                  facilitator_date: this.refs.facyear.value + "-" + this.refs.facmonth.value + "-" + this.refs.facday.value,
                  assessment_date: this.refs.ayear.value + "-" + this.refs.amonth.value + "-" + this.refs.aday.value,
                  moderation_date: this.refs.modyear.value + "-" + this.refs.modmonth.value + "-" + this.refs.modday.value
               }
    this.props.nextClicked(form, info);
  }

  render() {

    const { days, months } = this.props;
    return (
      <div class="ui equal width form">
        <div class="fields">
          <div className="field">
            <label>Facilitation Date</label>
              <div className="three fields">
                <div className="field">
                  <select name="day" className="ui fluid dropdown" ref="facday">
                    {
                      days.map((day) => <option key={day}>{day}</option>)
                    }
                  </select>
                </div>
                <div className="field">
                  <select className="ui fluid search dropdown" name="month" ref="facmonth">
                    {
                      months.map((month) => <option key={month}>{month}</option>)
                    }
                  </select>
                </div>
                <div className="field">
                  <input type="text" name="year" maxLength="4" placeholder="Year" ref="facyear"/>
                </div>
              </div>
          </div>
          <div className="field">
            <label>Assessor Date</label>
              <div className="three fields">
                <div className="field">
                  <select name="day" className="ui fluid dropdown" ref="aday">
                    {
                      days.map((day) => <option key={day}>{day}</option>)
                    }
                  </select>
                </div>
                <div className="field">
                  <select className="ui fluid search dropdown" name="month" ref="amonth">
                    {
                      months.map((month) => <option key={month}>{month}</option>)
                    }
                  </select>
                </div>
                <div className="field">
                  <input type="text" name="year" maxLength="4" placeholder="Year" ref="ayear"/>
                </div>
              </div>
          </div>
          <div className="field">
            <label>Moderation Date</label>
              <div className="three fields">
                <div className="field">
                  <select name="day" className="ui fluid dropdown" ref="modday">
                    {
                      days.map((day) => <option key={day}>{day}</option>)
                    }
                  </select>
                </div>
                <div className="field">
                  <select className="ui fluid search dropdown" name="month" ref="modmonth">
                    {
                      months.map((month) => <option key={month}>{month}</option>)
                    }
                  </select>
                </div>
                <div className="field">
                  <input type="text" name="year" maxLength="4" placeholder="Year" ref="modyear"/>
                </div>
              </div>
          </div>
        </div>
        <Button onClick={() => this.handleNext("learner")}>Next</Button>
      </div>
    )
  }

}
export default Dates;
