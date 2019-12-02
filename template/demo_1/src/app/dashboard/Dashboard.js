import React, { Component } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Sparklines, SparklinesBars } from 'react-sparklines';
import { ProgressBar, Dropdown } from 'react-bootstrap';

// import DatePicker from 'react-datepicker';
// import { Dropdown } from 'react-bootstrap';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate : new Date(),
      todos: [
        {
            id: 1,
            task: 'Pick up kids from school',
            isCompleted: false
        },
        {
            id: 2,
            task: 'Prepare for presentation',
            isCompleted: false
        },
        {
            id: 3,
            task: 'Print Statements',
            isCompleted: false
        },
        {
            id: 4,
            task: 'Create invoice',
            isCompleted: false
        },
        {
            id: 5,
            task: 'Call John',
            isCompleted: false
        }
    ],
    inputValue: '',
    }
    this.statusChangedHandler = this.statusChangedHandler.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  } 
  statusChangedHandler(event, id) {
    const todo = {...this.state.todos[id]};
    todo.isCompleted = event.target.checked;

    const todos = [...this.state.todos];
    todos[id] = todo;

    this.setState({
        todos: todos
    })
}

addTodo (event) {
    event.preventDefault();

    const todos = [...this.state.todos];
    todos.unshift({
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        task: this.state.inputValue,
        isCompleted: false
        
    })

    this.setState({
        todos: todos,
        inputValue: ''
    })
}

removeTodo (index) {
    const todos = [...this.state.todos];
    todos.splice(index, 1);

    this.setState({
        todos: todos
    })
}

inputChangeHandler(event) {
    this.setState({
        inputValue: event.target.value
    });
}
  areaData = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [{
        label: 'Product-1',
        data: [3, 3, 8, 5, 7, 4, 6, 4, 6, 3],
        backgroundColor: '#2196f3',
        borderColor: '#0c83e2',
        borderWidth: 1,
        fill: true,
        datasetKeyProvider: "key1"
      },
      {
        label: 'Product-2',
        data: [7, 5, 14, 7, 12, 6, 10, 6, 11, 5],
        backgroundColor: '#19d895',
        borderColor: '#15b67d',
        borderWidth: 1,
        fill: true,
        datasetKeyProvider: "key2"
      }
    ]
  };

  areaOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        gridLines: {
          color: "#F2F6F9"
        },
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 20,
          stepSize: 5,
        }
      }],
      xAxes: [{
        gridLines: {
          color: "#F2F6F9"
        },
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 2
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    stepsize: 1
  };
  usersDoughnutChartData = {
    datasets: [{
      data: [80, 34, 100],
      backgroundColor: [
        "#19d895",
        "#2196f3",
        "#dde4eb"
      ],
      borderColor: [
        "#19d895",
        "#2196f3",
        "#dde4eb"
      ],
    }],
    labels: [
      'Request',
      'Email',
    ]
};

usersDoughnutChartOptions = {
  cutoutPercentage: 70,
  animationEasing: "easeOutBounce",
  animateRotate: true,
  animateScale: false,
  responsive: true,
  maintainAspectRatio: true,
  showScale: true,
  legend: {
    display: false
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  }
};

amountDueBarData = {
  labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10"],
  datasets: [{
    label: 'Profit',
    data: [39, 19, 25, 16, 31, 39, 12, 18, 33, 24],
    backgroundColor: [
      '#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3',
    ],
    borderColor: [
      '#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3',
    ],
    borderWidth: 2,
    fill: true
  }]
};

amountDueBarOptions = {
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  },

  scales: {
    responsive: true,
    maintainAspectRatio: true,
    yAxes: [{
      display: false,
      gridLines: {
        color: 'rgba(0, 0, 0, 0.03)',
      }
    }],
    xAxes: [{
      display: false,
      barPercentage: 0.4,
      gridLines: {
        display: false,
      }
    }]
  },
  legend: {
    display: false
  }
};
toggleProBanner() {
  document.querySelector('.proBanner').classList.toggle("hide");
}
  
  render () {
    return (
      <div>
        <div className="row proBanner">
          <div className="col-12">
            <span className="d-flex align-items-center purchase-popup">
              <p>Like what you see? Check out our premium version for more.</p>
              <a href="https://github.com/BootstrapDash/StarAdmin-Free-React-Admin-Template" target="_blank" rel="noopener noreferrer" className="btn ml-auto download-button">Download Free Version</a>
              <a href="http://www.bootstrapdash.com/demo/star-admin-pro-react/template/demo_1/preview/dashboard" rel="noopener noreferrer" target="_blank" className="btn purchase-button">Upgrade To Pro</a>
              <i className="mdi mdi-close bannerClose" onClick={this.toggleProBanner}></i>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
            <div className="card card-statistics">
              <div className="card-body">
                <div className="clearfix">
                  <div className="float-left">
                    <i className="mdi mdi-cube text-danger icon-lg"></i>
                  </div>
                  <div className="float-right">
                    <p className="mb-0 text-right text-dark">Total Revenue</p>
                    <div className="fluid-container">
                      <h3 className="font-weight-medium text-right mb-0 text-dark">$65,650</h3>
                    </div>
                  </div>
                </div>
                <p className="text-muted mt-3 mb-0">
                  <i className="mdi mdi-alert-octagon mr-1" aria-hidden="true"></i> 65% lower growth </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
            <div className="card card-statistics">
              <div className="card-body">
                <div className="clearfix">
                  <div className="float-left">
                    <i className="mdi mdi-receipt text-warning icon-lg"></i>
                  </div>
                  <div className="float-right">
                    <p className="mb-0 text-right text-dark">Orders</p>
                    <div className="fluid-container">
                      <h3 className="font-weight-medium text-right mb-0 text-dark">3455</h3>
                    </div>
                  </div>
                </div>
                <p className="text-muted mt-3 mb-0">
                  <i className="mdi mdi-bookmark-outline mr-1" aria-hidden="true"></i> Product-wise sales </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
            <div className="card card-statistics">
              <div className="card-body">
                <div className="clearfix">
                  <div className="float-left">
                    <i className="mdi mdi-poll-box text-success icon-lg"></i>
                  </div>
                  <div className="float-right">
                    <p className="mb-0 text-right text-dark">Sales</p>
                    <div className="fluid-container">
                      <h3 className="font-weight-medium text-right mb-0 text-dark">5693</h3>
                    </div>
                  </div>
                </div>
                <p className="text-muted mt-3 mb-0">
                  <i className="mdi mdi-calendar mr-1" aria-hidden="true"></i> Weekly Sales </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
            <div className="card card-statistics">
              <div className="card-body">
                <div className="clearfix">
                  <div className="float-left">
                    <i className="mdi mdi-account-box-multiple text-info icon-lg"></i>
                  </div>
                  <div className="float-right">
                    <p className="mb-0 text-right text-dark">Employees</p>
                    <div className="fluid-container">
                      <h3 className="font-weight-medium text-right mb-0 text-dark">246</h3>
                    </div>
                  </div>
                </div>
                <p className="text-muted mt-3 mb-0">
                  <i className="mdi mdi-reload mr-1" aria-hidden="true"></i> Product-wise sales </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="card-title mb-0">Product Analysis</h2>
                  <div className="wrapper d-flex">
                    <div className="d-flex align-items-center mr-3">
                      <span className="dot-indicator bg-success"></span>
                      <p className="mb-0 ml-2 text-muted">Product</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="dot-indicator bg-primary"></span>
                      <p className="mb-0 ml-2 text-muted">Resources</p>
                    </div>
                  </div>
                </div>
                <div className="chart-container">
                <Line data={this.areaData} options={this.areaOptions}  datasetKeyProvider={this.datasetKeyProvider} height={80} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-6 col-sm-6  grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Todo</h4>
                <form  className="add-items d-lg-flex" onSubmit={this.addTodo}>
                  <input 
                      type="text" 
                      className="form-control h-auto" 
                      placeholder="What do you need to do today?" 
                      value={this.state.inputValue} 
                      onChange={this.inputChangeHandler}
                      required />
                  <button type="submit" className="btn btn-primary font-weight-bold ml-0 mt-2 mt-lg-0">Add</button>
                </form>
                <div className="list-wrapper">
                  <ul className="d-flex flex-column todo-list todo-padding-lg">
                    {this.state.todos.map((todo, index) =>{
                        return <ListItem 
                        isCompleted={todo.isCompleted}
                        changed={(event) => this.statusChangedHandler(event, index)}
                        key={todo.id}
                        remove={() => this.removeTodo(index) }
                        >{todo.task}</ListItem>
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Schedules</h4>
                <div className="shedule-list d-xl-flex align-items-center justify-content-between mb-3">
                  <h3>27 Sep 2018</h3>
                  <small>21 Events</small>
                </div>
                <div className="event border-bottom py-3">
                  <p className="mb-2 font-weight-medium">Skype call with alex</p>
                  <div className="d-flex align-items-center">
                    <div className="badge badge-success">3:45 AM</div>
                    <small className="text-muted ml-2">London, UK</small>
                    <div className="image-grouped ml-auto mt-2 mt-xl-0">
                      <img src={require("../../assets/images/faces/face10.jpg")} alt="profile" />
                      <img src={require("../../assets/images/faces/face13.jpg")} alt="profile" /> </div>
                  </div>
                </div>
                <div className="event py-3 border-bottom">
                  <p className="mb-2 font-weight-medium">Data Analysing with team</p>
                  <div className="d-flex  align-items-center">
                    <div className="badge badge-warning">12.30 AM</div>
                    <small className="text-muted ml-2">San Francisco, CA</small>
                    <div className="image-grouped ml-auto mt-2 mt-xl-0">
                      <img src={require("../../assets/images/faces/face20.jpg")} alt="profile "/>
                      <img src={require("../../assets/images/faces/face17.jpg")} alt="profile "/>
                      <img src={require("../../assets/images/faces/face14.jpg")} alt="profile " /> </div>
                  </div>
                </div>
                <div className="event py-3">
                  <p className="mb-2 font-weight-medium">Meeting with client</p>
                  <div className="d-flex  align-items-center">
                    <div className="badge badge-danger">4.15 AM</div>
                    <small className="text-muted ml-2">San Diego, CA</small>
                    <div className="image-grouped ml-auto mt-2 mt-xl-0">
                      <img src={require("../../assets/images/faces/face21.jpg")} alt="profile"/>
                      <img src={require("../../assets/images/faces/face16.jpg")} alt="profile" /> </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-12 col-sm-12 grid-margin stretch-card">
            <div className="row flex-grow">
              <div className="col-xl-12 col-lg-6 col-sm-6 grid-margin-0 grid-margin-xl stretch-card">
                <div className="card card-revenue">
                  <div className="card-body">
                    <div className="d-flex w-100 h-100 justify-content-between align-items-center">
                      <div className="mr-auto">
                        <p className="highlight-text text-white"> $168.90 </p>
                        <p className="text-white"> This Month </p>
                        <div className="badge badge-pill"> 18% </div>
                      </div>
                      <div className="ml-auto mt-2 mt-xl-0">
                        <Sparklines data={[4,3,10,9,4,3,8,6,7,8]} style={{ width: "110px", height:"70px" }}>
                          <SparklinesBars barWidth = {4} style={{ fill: "#fff" }} />
                        </Sparklines>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-12 col-lg-6 col-sm-6 stretch-card">
                <div className="card card-revenue-table mt-4 mt-sm-0 mt-xl-4">
                  <div className="card-body">
                    <div className="revenue-item d-flex">
                      <div className="revenue-desc">
                        <h6>Member Profit</h6>
                        <p className="font-weight-light"> Average Weekly Profit </p>
                      </div>
                      <div className="revenue-amount">
                        <p className="text-secondary"> +168.900 </p>
                      </div>
                    </div>
                    <div className="revenue-item d-flex">
                      <div className="revenue-desc">
                        <h6>Total Profit</h6>
                        <p className="font-weight-light"> Weekly Customer Orders </p>
                      </div>
                      <div className="revenue-amount">
                        <p className="text-primary"> +6890.00 </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-5 d-flex align-items-center">
                    <Doughnut data={this.usersDoughnutChartData} options={this.usersDoughnutChartOptions} width= {180} />
                  </div>
                  <div className="col-md-7">
                    <h4 className="card-title font-weight-medium mb-0 d-none d-md-block">Active Users</h4>
                    <div className="wrapper mt-4">
                      <div className="d-flex justify-content-between mb-2">
                        <div className="d-flex align-items-center">
                          <p className="mb-0 font-weight-medium">67,550</p>
                          <small className="text-muted ml-2">Email account</small>
                        </div>
                        <p className="mb-0 font-weight-medium">80%</p>
                      </div>
                        <ProgressBar variant="primary" now={80}/>
                    </div>
                    <div className="wrapper mt-4">
                      <div className="d-flex justify-content-between mb-2">
                        <div className="d-flex align-items-center">
                          <p className="mb-0 font-weight-medium">21,435</p>
                          <small className="text-muted ml-2">Requests</small>
                        </div>
                        <p className="mb-0 font-weight-medium">34%</p>
                      </div>
                        <ProgressBar variant="success" now={34}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-7">
                    <h4 className="card-title font-weight-medium mb-3">Amount Due</h4>
                    <h1 className="font-weight-medium mb-0 text-dark">$5998</h1>
                    <p className="text-muted">Milestone Completed</p>
                    <p className="mb-0">Payment for next week</p>
                  </div>
                  <div className="col-md-5 d-flex align-items-end mt-4 mt-md-0">
                    <Bar data={this.amountDueBarData} options={this.amountDueBarOptions} />    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body py-5">
                <div className="d-flex flex-row justify-content-center align-items">
                  <i className="mdi mdi-facebook text-facebook icon-lg"></i>
                  <div className="ml-3">
                    <h6 className="text-facebook font-weight-semibold mb-0">2.62 Subscribers</h6>
                    <p className="text-muted card-text">You main list growing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body py-5">
                <div className="d-flex flex-row justify-content-center align-items">
                  <i className="mdi mdi-google-plus text-google icon-lg"></i>
                  <div className="ml-3">
                    <h6 className="text-google font-weight-semibold mb-0">3.4k Followers</h6>
                    <p className="text-muted card-text">You main list growing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body py-5">
                <div className="d-flex flex-row justify-content-center align-items">
                  <i className="mdi mdi-twitter text-twitter icon-lg"></i>
                  <div className="ml-3">
                    <h6 className="text-twitter font-weight-semibold mb-0">3k followers</h6>
                    <p className="text-muted card-text">You main list growing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Orders</h4>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th> # </th>
                        <th> First name </th>
                        <th> Progress </th>
                        <th> Amount </th>
                        <th> Sales </th>
                        <th> Deadline </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-weight-medium"> 1 </td>
                        <td> Herman Beck </td>
                        <td>
                          <ProgressBar variant="success" striped now={25}/>
                        </td>
                        <td> $ 77.99 </td>
                        <td className="text-danger"> 53.64% <i className="mdi mdi-arrow-down"></i>
                        </td>
                        <td> May 15, 2015 </td>
                      </tr>
                      <tr>
                        <td className="font-weight-medium"> 2 </td>
                        <td> Messsy Adam </td>
                        <td>
                          <ProgressBar variant="danger" striped now={75}/>
                        </td>
                        <td> $245.30 </td>
                        <td className="text-success"> 24.56% <i className="mdi mdi-arrow-up"></i>
                        </td>
                        <td> July 1, 2015 </td>
                      </tr>
                      <tr>
                        <td className="font-weight-medium"> 3 </td>
                        <td> John Richards </td>
                        <td>
                          <ProgressBar variant="warning" striped now={90}/>
                        </td>
                        <td> $138.00 </td>
                        <td className="text-danger"> 28.76% <i className="mdi mdi-arrow-down"></i>
                        </td>
                        <td> Apr 12, 2015 </td>
                      </tr>
                      <tr>
                        <td className="font-weight-medium"> 4 </td>
                        <td> Peter Meggik </td>
                        <td>
                          <ProgressBar variant="primary" striped now={50}/>
                        </td>
                        <td> $ 77.99 </td>
                        <td className="text-danger"> 53.45% <i className="mdi mdi-arrow-down"></i>
                        </td>
                        <td> May 15, 2015 </td>
                      </tr>
                      <tr>
                        <td className="font-weight-medium"> 5 </td>
                        <td> Edward </td>
                        <td>
                          <ProgressBar variant="danger" striped now={35}/>
                        </td>
                        <td> $ 160.25 </td>
                        <td className="text-success"> 18.32% <i className="mdi mdi-arrow-up"></i>
                        </td>
                        <td> May 03, 2015 </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Manage Tickets</h5>
                <div className="fluid-container">
                  <div className="row ticket-card mt-3 pb-2 border-bottom pb-3 mb-3">
                    <div className="col-md-1">
                      <img className="img-sm rounded-circle mb-4 mb-md-0 d-block mx-md-auto" src={require("../../assets/images/faces/face1.jpg")} alt="profile" /> </div>
                    <div className="ticket-details col-md-9">
                      <div className="d-lg-flex">
                        <p className="text-dark font-weight-semibold mr-2 mb-0 no-wrap">James :</p>
                        <p className="text-primary mr-1 mb-0">[#23047]</p>
                        <p className="mb-0 ellipsis">Donec rutrum congue leo eget malesuada.</p>
                      </div>
                      <p className="text-gray ellipsis mb-2">Donec rutrum congue leo eget malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim vivamus. </p>
                      <div className="row text-gray d-md-flex d-none">
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted text-muted">Last responded :</small>
                          <small className="Last-responded mr-2 mb-0 text-muted text-muted">3 hours ago</small>
                        </div>
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted text-muted">Due in :</small>
                          <small className="Last-responded mr-2 mb-0 text-muted text-muted">2 Days</small>
                        </div>
                      </div>
                    </div>
                    <div className="ticket-actions col-md-2">
                      <div className="btn-group dropdown">
                        <Dropdown>
                          <Dropdown.Toggle className="btn btn-success btn-sm">
                            Manage
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="navbar-dropdown preview-list">
                            <Dropdown.Item>
                              Quick reply
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Another action
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Resolve Issue
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Close Issue
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <div className="row ticket-card mt-3 pb-2 border-bottom pb-3 mb-3">
                    <div className="col-md-1">
                      <img className="img-sm rounded-circle mb-4 mb-md-0 d-block mx-md-auto" src={require("../../assets/images/faces/face2.jpg")} alt="profile" /> </div>
                    <div className="ticket-details col-md-9">
                      <div className="d-lg-flex">
                        <p className="text-dark font-weight-semibold mr-2 mb-0 no-wrap">Stella :</p>
                        <p className="text-primary mr-1 mb-0">[#23135]</p>
                        <p className="mb-0 ellipsis">Curabitur aliquet quam id dui posuere blandit.</p>
                      </div>
                      <p className="text-gray ellipsis mb-2">Pellentesque in ipsum id orci porta dapibus. Sed porttitor lectus nibh. Curabitur non nulla sit amet nisl. </p>
                      <div className="row text-gray d-md-flex d-none">
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted">Last responded :</small>
                          <small className="Last-responded mr-2 mb-0 text-muted">3 hours ago</small>
                        </div>
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted">Due in :</small>
                          <small className="Last-responded mr-2 mb-0 text-muted">2 Days</small>
                        </div>
                      </div>
                    </div>
                    <div className="ticket-actions col-md-2">
                      <div className="btn-group dropdown">
                        <Dropdown>
                          <Dropdown.Toggle className="btn btn-success btn-sm">
                            Manage
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="navbar-dropdown preview-list">
                            <Dropdown.Item>
                              Quick reply
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Another action
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Resolve Issue
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Close Issue
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <div className="row ticket-card mt-3">
                    <div className="col-md-1">
                      <img className="img-sm rounded-circle mb-4 mb-md-0 d-block mx-md-auto" src={require("../../assets/images/faces/face3.jpg")} alt="profile" /> </div>
                    <div className="ticket-details col-md-9">
                      <div className="d-lg-flex">
                        <p className="text-dark font-weight-semibold mr-2 mb-0 no-wrap">John Doe :</p>
                        <p className="text-primary mr-1 mb-0">[#23246]</p>
                        <p className="mb-0 ellipsis">Mauris blandit aliquet elit, eget tincidunt nibh pulvinar.</p>
                      </div>
                      <p className="text-gray ellipsis mb-2">Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus. Lorem ipsum dolor sit amet.</p>
                      <div className="row text-gray d-md-flex d-none">
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted">Last responded :</small>
                          <small className="Last-responded mr-2 mb-0 text-muted">3 hours ago</small>
                        </div>
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted">Due in :</small>
                          <small className="Last-responded mr-2 mb-0 text-muted">2 Days</small>
                        </div>
                      </div>
                    </div>
                    <div className="ticket-actions col-md-2">
                      <div className="btn-group dropdown">
                        <Dropdown>
                          <Dropdown.Toggle className="btn btn-success dropdown-toggle btn-sm">
                            Manage
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="navbar-dropdown preview-list">
                            <Dropdown.Item>
                              Quick reply
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Another action
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Resolve Issue
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Close Issue
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    );
  }
}
const ListItem = (props) => {
  return (
      <li className={(props.isCompleted ? 'completed' : null)}>
          <div className="form-check form-check-success m-0 align-items-start">
              <label htmlFor="" className="form-check-label font-weight-medium"> 
                  <input className="checkbox" type="checkbox" 
                      checked={props.isCompleted} 
                      onChange={props.changed} 
                      /> {props.children} <i className="input-helper"></i>
              </label>
          </div>
          <i className="remove mdi mdi-close-circle-outline" onClick={props.remove}></i>
      </li>
  )
};
export default Dashboard;