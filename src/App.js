import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [listExpense, setListExpense] = useState([
    {
      name: 'Đỗ Văn A',
      amount: 20,
      date: '2022-01-01',
    },
    {
      name: 'Nguyễn Văn A',
      amount: 70,
      date: '2022-9-9',
    },
  
  ]);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [yearFilter, setYearFilter] = useState('2022');
  const [listChart, setListChart] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);
  
  const handleAddExpense = () => {
    const expense = {
      name,
      amount,
      date,
    };
    console.log('date: ', date, 'name', name);
    setListExpense([...listExpense, expense]);
  };
  
  // show  form
    const handleShowForm = ()=>{
      setToggleForm(true);
    }
   // đóng  form
  const handleCloseForm = () => {
    setToggleForm(false);
    setName('');
    setAmount('');
    setDate('');
  };

  const handleGetYearFilter = (event) => {
    let total = 0;
    console.log(event.target.value);
    setYearFilter(event.target.value);
    let listData = listExpense.filter((element) => {
      return element.date.split('-')[0] == event.target.value;
    });
    for (let i = 0; i < listData.length; i++) {
      total += parseInt(listData[i].amount);
    }

    for (let i = 0; i < listData.length; i++) {
      listData[i].percent = listData[i].amount / total;
    }
    console.log('listData: ', listData);
    setListChart(listData);
  };

  const convertMonth = (month) => {
    switch (parseInt(month)) {
      case 1:
        return 'January';
      case 9:
        return 'October';
    }
  };


  
  return (
    <div className="main">
       {toggleForm?(
    <div className="Add">
      <div className="input_list">
        <div className="input_item">
          <label>Name</label>
          <input type="text" placeholder="Enter name here ..." value={name} onChange={(e)=> setName(e.target.value)}/>
        </div>
        <div className="input_item">
          <label>Money</label>
          <input type="text" placeholder="Enter amount here ..." value={amount}onChange={(e)=> setAmount(e.target.value)}/>
        </div>
        <div className="input_item">
            <label>Date</label>
            <input type="date" placeholder="dd/mm/yy" value={date} onChange={(e)=>setDate(e.target.value)}/>
          </div>
      </div>
      <div className="btn_item">
        <button className="btn_add2"onClick={handleAddExpense}>ADD</button>
        <button className="btn_cancel"onClick={handleCloseForm}>CANCEL</button>
      </div>
    </div>
      ):(
    <div className="header">
      <button className="btn_add"onClick={handleShowForm}>Add new expense</button>
    </div>
     )}
    {/* <!-- body --> */}
    <div className="container">
      <div className="filter">
        <p className="text_filter">Filter by year</p>
        
        <div className="year_selector">
        <select value={yearFilter} onChange={handleGetYearFilter}>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
          </select>
        
          <div className="icon_year">
            <i className="fa-sharp fa-solid fa-caret-down"></i>
          </div>
        </div>
      </div>
      <div className="chart">
       
   
        {/* <!-- char_item1 --> */}
        {listChart.map((element, index) => (
        <div className="chart_item">
            <p>{convertMonth(element.date.split('-')[1])}</p>
          <div className="bar">
          <div className="chart-bar-fill"style={{ height: `${element.percent * 100}%` }}></div>
          </div>
          <p className="text_chart"></p>
        </div>))}
        {/* <!-- char_item2 --> */}
      
      
   
      </div>
      
      <div className="expense_list">
        {/* <!-- expense_item1 --> */}
        {listExpense.map((element, index) => {
            return (
        <div className="expense_item"key={index}>  
          {/* <!-- box-time --> */}
          <div className="date">
            <div className="month">  {convertMonth(element.date.split('-')[1])}</div>
            <div className="year"> {element.date.split('-')[0]} </div>
            <div className="day">  {element.date.split('-')[2]} </div>
          </div>
          {/* <!-- title --> */}
          <div className="title_expense">
            <p className="title_expense_item">{element.name}</p>
          </div>
          {/* <!-- box-money --> */}
          <div className="box_money">
            <p className="title_money">${element.amount}</p>
          </div>
        </div>)
        })}
  
      </div>
    </div>
  </div>
  );
}

export default App;
