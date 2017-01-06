import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
  constructor(){
    super()
    this.state = {
        items : [], 
        hasMoreItems:  false,
        filtersApplied: {},
        params: "",
        total: 0,
        "filters": [],
        loaded: false
        };

    this.sort = "";
    this.filters = [];
    this.query = "tecnologia";
    this.offset = 0;
        
    this.filtersOption = {};
    this.filtersOptionName = {};

    this.params = {};
  }

  componentDidMount(){
    this.setNewItems({});
  }

  /*
    -----------------------------------------------------
    Functions Filter, removeFilter, Set and SetMore items
    -----------------------------------------------------
  */

  getItems(params = {}) {
    params = Object.keys(params).reduce((acum, key) => acum + `&${key}=${params[key]}`, "");
    return $.get("https://api.mercadolibre.com/sites/MLA/search?q="+this.query+this.sort+"&offset="+this.offset+params);
  }

  setNewItems(params = {}) {
    this.setState({loaded: true})

    this.offset = 0;

    this.getItems(params).done(res => {

      const filters = res.available_filters;
      this.offset = res.paging.total > 50 ? 50: res.paging.total;
      
      this.setState({total : res.paging.total, filters, hasMoreItems: this.offset < res.paging.total , items: res.results, loaded: false});

    })
  }

  addItems(params = {}) {
    this.setState({loaded: true})

    this.getItems(params).done(res => {
      const offset = this.offset + 50;
      const items = [...this.state.items, ...res.results];
      this.offset += 50;

      this.setState({hasMoreItems: this.offset < res.paging.total, loaded: false, items});
    });
  }
 
  filter(event, id){
    let filtersApplied =  Object.assign({},this.state.filtersApplied);
    filtersApplied[id] = event.target.value;

    this.filtersOptionName[id] = event.target.selectedOptions[0].text;
    this.params[id] = filtersApplied[id];

    this.setState({filtersApplied:filtersApplied});
    this.setNewItems(this.params);
  }
  
  removeFilter(id) {
    console.log(id)
    let filtersApplied =  Object.assign({},this.state.filtersApplied);
    filtersApplied[id] = "";

    delete this.filtersOptionName[id];
    delete this.params[id];

    this.setState({filtersApplied});
    this.setNewItems(this.params)
  }

  /*
    --------------------------
    Functions search component
    --------------------------
  */

  setQuery(e){
    this.query = e.target.value;
  }

  changeSort(e){
    this.sort = e.target.value;
    this.setNewItems(this.params);
  }

  handleKeyUp(e){
    if(e.keyCode == 13 && e.target.value.length){
      this.setNewItems(e.target.value)
    }
  }

  /*------------------------------*/
  
  render(){
    return(
      <div className="app">
        <div className="search-wrapper">
          <Search onKeyUp={(e)=>{this.handleKeyUp(e)}} onClick={()=> {this.setNewItems()}} data={this.query} query={this.setQuery.bind(this)} />
          <Sorts onChange={(event)=>{this.changeSort(event)}}/>
        </div>
        <div className="content-wrapper">
          <div className="filters-wrapper">
          
            <Filters filters={this.state.filters} filtersApplied={this.state.filtersApplied} onChange={(event, filterId)=>{this.filter(event, filterId)}}/>
            <FiltersApplied optionsName={this.filtersOptionName} onClick={this.removeFilter.bind(this)}/>
          </div>
          <div className="products-wrapper">
            <ProductList items={this.state.items}/>
            <ViewMore hasMoreItems={this.state.hasMoreItems}  onClick={() => { this.addItems(this.params) }}/>
            <Loader loaded={this.state.loaded} />
          </div>     
        </div>
      </div> 
    )
  }
}

/*
  ---------------------------------
  Component Search Input and button
  ---------------------------------
*/
const Search = props => {
  return(
    <div className="search-content">
      <input onChange={props.query} className="input-search"  onKeyUp={e => { props.onKeyUp(e)}} type="text"/>
      <button data-query={props.data} onClick={e => {props.onClick()}} className="btn-search"><div className="search icon"></div></button>
    </div>
  )
};

/*
  ---------------------------------
  Component Sortby
  ---------------------------------
*/
const Sorts = props => {
  return(
    <div className="sortBy">
      ordenar por
      <select onChange={(e)=>{props.onChange(e)}} id="">
        <option value=""></option>
        <option value="&sort=price_asc">De a menor precio</option>
        <option value="&sort=price_desc">De a mayor precio</option>
      </select>
      
    </div>
  )
};

/*
  ---------------------------------
  Component Product List ===> product-item
  ---------------------------------
*/
const ProductList = props => {
  return(
    <div className="product-list">
      {
        props.items.map((product, index)=>{
          return <Product key={product.id} title={product.title} permalink={product.permalink} price={product.price} thumbnail={product.thumbnail} /> 
        })
      }
    </div>
  )
};
/*
  ---------------------------------
  Component ProductItem
  ---------------------------------
*/
const Product = props => {
  return(
    <div className="product">
      <img src={props.thumbnail} alt=""/>
      <div className="data">
        <h5>{props.title}</h5>
        <a href={props.permalink}>Ver Producto</a>
        <p>${props.price}</p>
      </div>
    </div>
  )
};


/*
  ---------------------------------
  Component viewMore items
  ---------------------------------
*/

const ViewMore = props => {
  return(
    <div className="btn-wrapper">
    {
      props.hasMoreItems ? <button  onClick={()=>{props.onClick()}}>ver más</button> : ""
    }  
    </div>
  )
};


/*
  ---------------------------------
  Component Filters Active
  ---------------------------------
*/

const FiltersApplied = props => {
  return (
    <div>
      {
        Object.keys(props.optionsName).map(id => {
          return <div className="filterActive" key={id} > <span>{props.optionsName[id]}</span><button onClick={()=>{props.onClick(id)}}>×</button> </div>
        })
      }
    </div>
    )
};

/*
  ---------------------------------
  Component Loader
  ---------------------------------
*/ 
const Loader = props => {
  return(
   <div className={`loader ${props.loaded ? "loaded" : ""}`}>
    <div  id="fountainG">
      <div id="fountainG_1" className="fountainG"></div>
      <div id="fountainG_2" className="fountainG"></div>
      <div id="fountainG_3" className="fountainG"></div>
      <div id="fountainG_4" className="fountainG"></div>
      <div id="fountainG_5" className="fountainG"></div>
      <div id="fountainG_6" className="fountainG"></div>
      <div id="fountainG_7" className="fountainG"></div>
      <div id="fountainG_8" className="fountainG"></div>
    </div>
  </div>
  )
};

/*
  ---------------------------------
  Component Filters items
  ---------------------------------
*/
const Filters = props => {
  return(
    <div className="filters">
      {
        props.filters.map((filter,index)=>{
          return(
            <div className="filter" key={filter.name}>

            <Select value={filter.id in props.filtersApplied ? props.filtersApplied[filter.id]: ""} key={index} filter={filter} onChange={(event, filterId)=>{ props.onChange(event, filterId)} }/>
            </div>
          )
        })
      }
    </div>
  )
};

/*
  ---------------------------------
  Component Select ==> options
  ---------------------------------
*/
class Select extends React.Component{
  constructor(props) {
    super(props);
  }
  renderOptions(id, options){
    return(
      options.map((value, index) => {
         return <option key={value.id} name={value.name} value={value.id}>{value.name}</option>
      })
    )
  };

  render(){
    return(
      <select value={this.props.value} onChange={(event)=>{ this.props.onChange(event, this.props.filter.id)}}>
        <option value="" disabled>{this.props.filter.name}</option>
        {this.renderOptions(this.props.filter.id, this.props.filter.values)}
      </select>
    )
  }
};




ReactDOM.render(<App/>, document.getElementById('app'))

