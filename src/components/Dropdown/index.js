import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import onClickOutside from "react-onclickoutside";
import dictionary from './dictionary';
import '../../common/css/multiselect.css';

/**
 * Provides the multi select functionality as described in the iPaid
 * requirements specification.
 */
class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        // get the localized strings for the native resources here...
        this.allString = dictionary('all', props.locale);
        this.selectedString = dictionary('selected', props.locale);
        
        // build up the select list to work from.
        const itemsChecked = this.InitializeItemsCheckedObj(props.items);

        this.state = ({
            itemsChecked,
            placeholderText: this.allString,
            allState: true,
            listShow: false
        });
    }
    
    /**
     * Callback for the onClickOutside service that will allow the control to
     * perform a dropdown close process.
     * 
     * @function handleClickOutside
     * @param {object} evt - The event object passed by the onClickOutside
     * service. (not used.)
     */
    handleClickOutside = evt => {
        if(this.state.listShow) {
            this.toggleList();
        }
    };
    
    /**
     * Extracts the name value from the list item's object.
     * 
     * @function getItemName
     * @param {string} id - The id memeber item from the initial itemsChecked
     * list.
     * @returns {string} - The name value associated with the id value provided.
     */
    getItemName = id => {
        let name;
        for(let n = 0; n < this.props.items.length; n +=1) {
            if(this.props.items[n].id === id) {
                name = this.props.items[n].name;
                break;
            }
        }
        return name;
    }

    /**
     * Returns the number of items selected in an items object.
     * 
     * @function selectedCount
     * @param {object} selectedObj - Object containing id/state mapping.
     * @returns {number} - The count of the items in the `selectObj` found 
     * to be true.
     */
    selectedCount = (selectedObj) => {
        let count = 0;
        const keys = Object.keys(selectedObj);
        keys.forEach(key => {
            if (selectedObj[key]) {
                count += 1;
            }
        });
        return count;
    };

    /**
     * Initializes the dropdown state with id/name array passed by client.
     * 
     * @function InitializeItemsCheckedObj
     * @param {object} selectedObj - Object containing id/state mapping.
     * @returns {object} - List item id/boolean mapping for attaching to the 
     * state. 
     */    
    InitializeItemsCheckedObj = (items) => {
        const theObj = {};
        items.forEach((item) => {
            theObj[item.id] = false;
        });
        return theObj;
    };

    /**
     * Helper for extracting the items stated as `true` within an itemsChecked
     * array.
     * If `all` selected state is indicated as `true`, all items in the
     * itemsChecked is returned.
     * 
     * @function getSelectedItems
     * @param {array} preItems - An optional array containing:
     * [0] a checked item object containing id/state mapping.
     * [1] a boolean value indicating whether or not `all` is selected.
     * If not provided, will work directly off of the component's current state.
     * @returns {array} - Array of id names of all items found to be selected. 
     */ 
    getSelectedItems = (preItems) => {
        let selectedItems = [];
        const theItems = preItems ? preItems[0] : this.state.itemsChecked;
        const allState = preItems ? preItems[1] : this.state.allState;
        if (allState) {
            selectedItems = Object.keys(theItems);
        } else {
            Object.keys(theItems).forEach(item => {
                if (theItems[item]) {
                    selectedItems.push(item);
                }
            });
        }
        return selectedItems;
    };

    /**
     * Handler for item list change event.
     * NOTE: Yes, it's by design that if `all` is selected, all other items are
     * checked as false.
     * 
     * @function onListChanged
     * @param {object} evt - Event that indicates which of the items was
     * changed.
     */ 
    onListChanged = (evt) => {
        const changedItem = evt.target.value;
        let itemsChecked = { ...this.state.itemsChecked };
        let allState = false;
        let placeholderText;
        if (changedItem === 'all') {
            // if the current state of the all checkbox is going to change to true,
            // we need to mark the other checkboxes to false.
            allState = true;
            placeholderText = this.allString;
            itemsChecked = _.mapValues(itemsChecked, () => false);
        } else {
            itemsChecked[changedItem] = !itemsChecked[changedItem];
            const selectedCount = this.selectedCount(itemsChecked);
            if (selectedCount === 0) {
                allState = true;
                placeholderText = this.allString;
            } else if(selectedCount === 1) {
                const theItem = this.getSelectedItems([itemsChecked, allState])[0];
                placeholderText = this.getItemName(theItem);
            } else {
                placeholderText = `${this.selectedString} (${selectedCount})`;
            }
        }

        this.setState({
            allState,
            itemsChecked,
            placeholderText
        });
    };
    
    /**
     * Toggles the dropdown list between show and hide.
     * We send the list if selected items to the client prior to the list being
     * hidden.
     * 
     * @function toggleList
     */     
    toggleList = () => {
        // if we're about to hide the list, send the selected items
        // to the client
        if(this.state.listShow) {
            this.props.selectedCallback(this.getSelectedItems());
        }
        this.setState({
            listShow: !this.state.listShow
        })
    }

    /**
     * JSX generator for the check button based list item.
     * 
     * @function createCheckItem
     * @param {oject} item - Object containing the id/name mapping for the line
     * item.
     * @param {object} key - Unique key to apply to the list item that will be
     * rendered in a list.
     */ 
    createCheckItem = (item, key) => (
        <div key={key} className="dd-list-entry">
            <label htmlFor={item.id} className="dd-item-container">
                {item.name}
                <input
                    type="checkbox" id={item.id} data-test={item.id} name={item.id} data-id={item.id} value={item.id}
                    checked={this.state.itemsChecked[item.id]} onChange={this.onListChanged}
                />
                <span className="checkmark"></span>
            </label>
        </div>
    );


    render() {
        const listClass = 'check-list' + ( this.state.listShow ? ' show' : ' hide' );
        const { listShow } = this.state;

        return (
            <div data-test="component-dropdown" className="dd-container">
                <span className="dd-header" onClick={this.toggleList}>
                    <label className="dd-selected-options" >
                        {this.state.placeholderText}
                    </label>
                    <div className='dd-arrow'>
                        {listShow
                          ? <FontAwesomeIcon icon={faAngleUp}/>
                          : <FontAwesomeIcon icon={faAngleDown}/>
                        }
                    </div>
                </span>
                <div className={listClass}>
                    <div className="dd-list-entry" >
                        <label htmlFor={'all'} className="dd-item-container">
                            {this.allString}
                            <input
                                type="checkbox" id="all" name="selectOne" data-id="all" value="all"
                                checked={this.state.allState} onChange={this.onListChanged}
                                disabled={this.state.allState}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    {this.props.items.map((item, index) => (this.createCheckItem(item, index)))}
                </div>
            </div>
        );
    }
}

/* eslint react/no-unused-prop-types: off */
Dropdown.propTypes = {
    selectedCallback: PropTypes.func.isRequired,
    locale: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }))
};

export default onClickOutside(Dropdown);