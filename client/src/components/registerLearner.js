import React, { Component } from 'react'

class registerLearner extends Component {

  constructor(props) {
    super(props);
  }

  handleSubmit = () => {

    let info = {
                national_id: this.refs.id.value,
                alt_id: this.refs.altid.value,
                equity: this.refs.equity.value,
                nationality: this.refs.nationality.value,
                gender: this.refs.gender.value,
                language: this.refs.lang.value,
                employed: this.refs.employed.value,
                disability: this.refs.disability.value,
                surname: this.refs.surname.value,
                firstname: this.refs.firstname.value,
                secondname: this.refs.secname.value,
                title: this.refs.title.value,
                dob: this.refs.year.value + "-" + this.refs.month.value + "-" + this.refs.day.value,
                homeaddr: this.refs.addr.value + ", " + this.refs.addr2.value + ", " + this.refs.addr3.value,
                postaddr: this.refs.paddr.value +", " + this.refs.paddr2.value + ", " + this.refs.paddr3.value,
                cellno: this.refs.cellno.value,
                employer: this.refs.employer.value,
                workaddr: this.refs.waddr.value +", " + this.refs.waddr2.value + ", " + this.refs.waddr3.value,
                faxno: this.refs.faxno.value,
                workno: this.refs.wphno.value,
                email: this.refs.email.value,
                prev_surname: this.refs.prevsur.value,
                assessment_date: this.refs.ayear.value + "-" + this.refs.amonth.value + "-" + this.refs.aday.value,
              //  assessor: this.refs.assessor.value,
                //moderator: this.refs.moderator.value,
                //facilitator: this.refs.facilitator.value,
                club: this.refs.club.value,
                programme: this.refs.programme.value,
                qualification: this.refs.qualification.value,
                skill_programme: this.refs.skill.value,
                short_course: this.refs.shortcourse.value,
                unitstd: this.refs.unitstandard.value
               }

    this.props.handleSubmit(info);
  }

  render() {

    const { days, months } = this.props;

    return (
  <form className="ui form">
    <h4 className="ui dividing header">Learner Information</h4>
    <div className="field">
      <label>National ID Number</label>
      <div className="two fields">
        <div className="field">
          <input type="text" name="id" placeholder="National ID Number" ref="id"/>
        </div>
        <div className="field">
          <input type="text" name="altid" placeholder="Alternative ID Type" ref="altid"/>
        </div>
      </div>
    </div>
    <div className="three fields">
      <div className="field">
        <label>Equity</label>
          <select className="ui fluid dropdown" ref="equity">
            <option></option>
            <option value="">African</option>
            <option value="">Coloures</option>
            <option value="">Indian</option>
              <option value="">White</option>
              <option value="">Other</option>
          </select>
      </div>
      <div className="field">
        <label>Nationality</label>
        <input type="text" name="Nationality" placeholder="Nationality" ref="nationality"/>
      </div>
      <div className="field">
        <label>Gender</label>
        <select className="ui fluid dropdown" ref="gender">
          <option></option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>
    </div>
      <div className="field">
          <label>Home Language</label>
          <select className="ui fluid dropdown" ref="lang">
            <option></option>
            <option>English</option>
            <option>Afrikaans</option>
            <option>Southern Sotho</option>
            <option>Tsonga</option>
            <option>Tswana</option>
            <option>Swati</option>
            <option>Zulu</option>
            <option>Northern Sotho</option>
            <option>Ndebele</option>
            <option>Xhosa</option>
            <option>Venda</option>
            <option>Other</option>
          </select>
      </div>
    <div className="two fields">
      <div className="field">
        <label>Employed</label>
        <select className="ui fluid dropdown" ref="employed">
          <option value=""></option>
          <option value="AL">Yes</option>
          <option value="AK">No</option>
        </select>
      </div>
      <div className="field">
        <label>Disability</label>
          <input type="text" name="disability" placeholder="Disability" ref="disability"/>
      </div>
    </div>
    <div className="field">
      <label>Surname</label>
      <input type="text" name="surname" placeholder="Surname" ref="surname"/>
    </div>
    <div className="field">
      <label>First Name</label>
      <input type="text" name="firstname" placeholder="First Name" ref="firstname"/>
    </div>
    <div className="field">
      <label>Second Name</label>
      <input type="text" name="secondname" placeholder="Second Name" ref="secname"/>
    </div>
    <div className="two fields">
      <div className="field">
        <label>Title</label>
        <input type="text" name="title" placeholder="Title" ref="title"/>
      </div>
      <div className="field">
        <label>Birth Date</label>
          <div className="three fields">
            <div className="field">
              <select name="day" className="ui fluid dropdown" ref="day">
                {
                  days.map((day) => <option key={day}>{day}</option>)
                }
              </select>
            </div>
            <div className="field">
              <select className="ui fluid search dropdown" name="month" ref="month">
                {
                  months.map((month) => <option key={month}>{month}</option>)
                }
              </select>
            </div>
            <div className="field">
              <input type="text" name="year" maxLength="4" placeholder="Year" ref="year"/>
            </div>
          </div>
      </div>
    </div>
    <div className="field">
      <label>Home Address</label>
      <div className="fields">
        <div className="twelve wide field">
          <input type="text" name="address" placeholder="Street Address" ref="addr"/>
        </div>
        <div className="four wide field">
          <input type="text" name="address2" placeholder="Apt #" ref="addr2"/>
        </div>
      </div>
    </div>
    <div className="two fields">
      <div className="field">
        <label>Postal Code</label>
        <input type="text" name="postal" placeholder="Postal Code" ref="addr3"/>
      </div>
      <div className="field">
        <label>Home Phone Number</label>
        <input type="text" name="homeno" placeholder="Home Phone Number" ref="hphone"/>
      </div>
    </div>
    <div className="field">
      <label>Postal Address</label>
      <div className="fields">
        <div className="twelve wide field">
          <input type="text" name="paddress" placeholder="Postal Address" ref="paddr"/>
        </div>
        <div className="four wide field">
          <input type="text" name="address2" placeholder="Apt #" ref="paddr2"/>
        </div>
      </div>
    </div>
    <div className="two fields">
      <div className="field">
        <label>Postal Code</label>
        <input type="text" name="postal" placeholder="Postal Code" ref="paddr3"/>
      </div>
      <div className="field">
        <label>Cell Phone Number</label>
        <input type="text" name="cellno" placeholder="Cell Phone Number" ref="cellno"/>
      </div>
    </div>
    <div className="field">
      <label>Name of Employer</label>
      <input type="text" name="employer" placeholder="Name of Employer" ref="employer"/>
    </div>
    <div className="field">
      <label>Work Address</label>
      <div className="fields">
        <div className="twelve wide field">
          <input type="text" name="workaddress" placeholder="Work Address" ref="waddr"/>
        </div>
        <div className="four wide field">
          <input type="text" name="address2" placeholder="Apt #" ref="waddr2"/>
        </div>
        <div className="field">
          <label>Postal Code</label>
          <input type="text" name="postal" placeholder="Postal Code" ref="waddr3"/>
        </div>
      </div>
    </div>
    <div className="two fields">
      <div className="field">
        <label>Fax Number</label>
        <input type="text" name="faxno" placeholder="Fax Number" ref="faxno"/>
      </div>
      <div className="field">
        <label>Work Phone Number</label>
        <input type="text" name="workno" placeholder="Work Phone Number" ref="wphno"/>
      </div>
    </div>
    <div className="field">
      <label>E-mail Address</label>
      <input type="text" name="email" placeholder="E-mail Address" ref="email"/>
    </div>
    <div className="field">
      <label>Previous Surname</label>
      <input type="text" name="prevsurname" placeholder="Previous Surname" ref="prevsur"/>
    </div>
    <div className="field">
      <label>Unit Standard</label>
      <select className="ui fluid search dropdown" name="Unit Standard" ref="unitstd">
        {
          months.map((month) => <option key={month}>{month}</option>)
        }
      </select>
    </div>
    <div className="field">
      <label>Indicate wen summative assessment will be completed</label>
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
      <label>Assessor</label>
      <select className="ui fluid dropdown" ref="assessor">
        <option></option>
      </select>
    </div>
    <div className="field">
      <label>Moderator</label>
        <input type="text" name="moderator" placeholder="Moderator" ref="moderator"/>
    </div>
    <div className="field">
      <label>Facilitator</label>
        <input type="text" name="facilitator" placeholder="Facilitator" ref="facilitator" />
    </div>
    <div className="field">
      <label>Club</label>
        <input type="text" name="club" placeholder="Club" ref="club"/>
    </div>
    <div className="fields">
      <div className="field">
        <label>Type of Programme</label>
          <input type="text" name="programme" placeholder="Type of Programme" ref="programme"/>
      </div>
      <div className="field">
        <label>Qualification</label>
          <input type="text" name="qualification" placeholder="Qualification" ref="qualification"/>
      </div>
      <div className="field">
        <label>Skill Programme</label>
          <input type="text" name="skill" placeholder="Skill Programme" ref="skill"/>
      </div>
      <div className="field">
        <label>Short Course</label>
          <input type="text" name="shortcourse" placeholder="Short Course" ref="shortcourse"/>
      </div>
      <div className="field">
        <label>Unit Standard</label>
          <input type="text" name="unitstandard" placeholder="Unit Standard" ref="unitstandard"/>
      </div>
    </div>
    <div onClick={this.handleSubmit} className="ui button" tabIndex="0">Submit Learner</div>
  </form>
    )
  }

}
export default registerLearner;
