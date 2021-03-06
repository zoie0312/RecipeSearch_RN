'use strict';

import React from 'react'
import ReactNative from 'react-native'
import {connect} from 'react-redux'

let {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  AsyncStorage,
  ActivityIndicator
} = ReactNative;

import GiftedListView from './GiftedListView'
import RecipeItem from './RecipeItem'
import {finishFetchingRecipes} from '../actions/recipe'
import {updateSearchResult} from '../actions/search'
import {SEARCH_RESULT_URL, STORAGE_KEY_USERNAME} from '../constants/AppData'


class RecipeList extends React.Component{
  
  constructor(props) {
      super(props)
      
      this._onFetch = this._onFetch.bind(this)
  }
  
  /**
   * Will be called when refreshing
   * Should be replaced by your own logic
   * @param {number} page Requested page to fetch
   * @param {function} callback Should pass the rows
   * @param {object} options Inform if first load
   */
  _onFetch(page = 1, callback, options) {
    var me = this;
    var url = SEARCH_RESULT_URL + 
        (page) + '&start=' + 
        ((page-1)*15) + '&limit=' +
        (page*15);

    try {
		AsyncStorage.getItem(STORAGE_KEY_USERNAME, (err, result) => {
			if (err) {
				me.props.dispatch(finishFetchingRecipes());
				callback({});
			} else {
				let json_data = {};
    			json_data['username'] = JSON.parse(result);
    			let opt = {
        			headers: {
            			'Accept': 'application/json',
            			'Content-Type': 'application/json; charset=UTF-8'
        			},
        			method: 'POST',
			        body: JSON.stringify(json_data)
    			};
				fetch(url, opt)
	            .then(response => {
					if (response.status === 200) {
                		return response.json();
					}
				})
            	.then(resp => {
                	//console.log('search recipe responsed successfully');
					var header = 'Page '+page;
					var rows = {};
					rows[header] = [];
					resp.items.forEach(function(recipe, idx) {
						rows[header].push({
							title: recipe.title,
							ingredientList: recipe.ingredients,
							image: recipe.large_img_url,
							smallImage: recipe.small_img_url, 
							sourceUrl: recipe.url
						})
					});
					me.props.dispatch(finishFetchingRecipes());
					if (page === 1) {
					me.props.dispatch(updateSearchResult(rows));
					}
					callback(rows);
            	})
            	.catch(error => {
					console.log(error);
					me.props.dispatch(finishFetchingRecipes());
					callback({});
				})
			}

      	});
    } catch (error) {
      	console.log('AsyncStorage error: ' + error.message);
		me.props.dispatch(finishFetchingRecipes());
		callback({});
    }
  }
  
  
  /**
   * When a row is touched
   * @param {object} rowData Row data
   */
  _onPress(rowData) {
    console.log(rowData+' pressed');
  }
  
  /**
   * Render a row
   * @param {object} rowData Row data
   */
  _renderRowView(rowData) {
       return (
           <RecipeItem
               key={rowData.title}
               {...rowData}
           />
       )
  }

  /**
   * Render a row
   * @param {object} rowData Row data
   */
  _renderSectionHeaderView(sectionData, sectionID) {
    return (
      <View style={customStyles.header}>
        <Text style={customStyles.headerTitle}>
          {sectionID}
        </Text>
      </View>
    );
  }
  
  /**
   * Render the refreshable view when waiting for refresh
   * On Android, the view should be touchable to trigger the refreshCallback
   * @param {function} refreshCallback The function to call to refresh the listview
   */
  _renderRefreshableWaitingView(refreshCallback) {
    if (Platform.OS !== 'android') {
      return (
        <View style={customStyles.refreshableView}>
          <Text style={customStyles.actionsLabel}>
            ↓
          </Text>
        </View>
      );
    } else {
      return (
        <TouchableHighlight 
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
          style={customStyles.refreshableView}
        >
          <Text style={customStyles.actionsLabel}>
            ↻
          </Text>
        </TouchableHighlight>
      );
    }
  }

  /**
   * Render the refreshable view when the pull to refresh has been activated
   * @platform ios
   */
  _renderRefreshableWillRefreshView() {
    return (
      <View style={customStyles.refreshableView}>
        <Text style={customStyles.actionsLabel}>
          ↻
        </Text>
      </View>
    );
  }

  /**
   * Render the refreshable view when fetching
   */
  _renderRefreshableFetchingView() {
    return (
      <View style={customStyles.refreshableView}>
        <ActivityIndicator />
      </View>
    );
  }
  
  /**
   * Render the pagination view when waiting for touch
   * @param {function} paginateCallback The function to call to load more rows
   */
  _renderPaginationWaitingView(paginateCallback) {
    return (
      <TouchableHighlight 
        underlayColor='#c8c7cc'
        onPress={paginateCallback}
        style={customStyles.paginationView}
      >
        <Text style={[customStyles.actionsLabel, {fontSize: 13}]}>
          Load more
        </Text>
      </TouchableHighlight>
    );
  }
  
  /**
   * Render the pagination view when fetching
   */
  _renderPaginationFetchigView() {
    return (
      <View style={customStyles.paginationView}>
        <ActivityIndicator />
      </View>
    );
  }
  
  /**
   * Render the pagination view when end of list is reached
   */
  _renderPaginationAllLoadedView() {
    return (
      <View style={customStyles.paginationView}>
        <Text style={customStyles.actionsLabel}>
          ~
        </Text>
      </View>
    );
  }
  
  /**
   * Render a view when there is no row to display at the first fetch
   * @param {function} refreshCallback The function to call to refresh the listview
   */
  _renderEmptyView(refreshCallback) {
    return (
      <View style={customStyles.defaultView}>
        <Text style={customStyles.defaultViewTitle}>
          Sorry, there is no content to display
        </Text>
        
        <TouchableHighlight 
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
        >
          <Text>
            ↻
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
  
  /**
   * Render a separator between rows
   */
  _renderSeparatorView(sectionID, rowID) {
    return (
      <View style={customStyles.separator} key={`${sectionID}-${rowID}`}/>
    );
  }
  
  componentWillUpdate(nextProps, nextStates) {
      if (nextProps.isSearching) {
          this.refs.giftedlistview.showSearching();
      }
      if (nextProps.isFetchingRecipes) {
          this.refs.giftedlistview.fetchRecipes();
      }
  }

  render() {
    const { persistentSearchResult } = this.props;
    return (
      <View style={screenStyles.container}>

        <GiftedListView
          ref="giftedlistview"
          rowView={this._renderRowView.bind(this)}
          defaultRowData={persistentSearchResult}
          onFetch={this._onFetch}
          initialListSize={12} // the maximum number of rows displayable without scrolling (height of the listview / height of row)

          firstLoader={false} // display a loader for the first fetching
      
          pagination={true} // enable infinite scrolling using touch to load more
          paginationFetchigView={this._renderPaginationFetchigView}
          paginationAllLoadedView={this._renderPaginationAllLoadedView}
          paginationWaitingView={this._renderPaginationWaitingView}

          refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
          refreshableViewHeight={50} // correct height is mandatory
          refreshableDistance={40} // the distance to trigger the pull-to-refresh - better to have it lower than refreshableViewHeight
          refreshableFetchingView={this._renderRefreshableFetchingView}
          refreshableWillRefreshView={this._renderRefreshableWillRefreshView}
          refreshableWaitingView={this._renderRefreshableWaitingView}
          
          emptyView={this._renderEmptyView}
          
          renderSeparator={this._renderSeparatorView}
          
          withSections={true} // enable sections
          sectionHeaderView={this._renderSectionHeaderView}
          
          PullToRefreshViewAndroidProps={{
            colors: ['#fff'],
            progressBackgroundColor: '#003e82',
          }}
        />
      </View>
    );
  }
}

function select(state) { //mapStateToProps from Redux
    return {
        isSearching: state.recipe.isSearching,
        isFetchingRecipes: state.recipe.isFetchingRecipes,
        persistentSearchResult: state.search.searchResult
    }
}

var customStyles = {
  separator: {
    height: 1,
    backgroundColor: '#CCC'
  },
  refreshableView: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsLabel: {
    fontSize: 20,
    color: '#007aff',
  },
  paginationView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  defaultView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  defaultViewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    padding: 10,
    height: 44,
  },
  header: {
    backgroundColor: '#50a4ff',
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
  },
};

var screenStyles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  navBar: {
    height: 64,
    backgroundColor: '#007aff',

    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
  }
};

export default connect(select)(RecipeList)