'use strict';
/* global getItems */

const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/ahad';

  const getItems = function (callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, data => console.log(data));
  };
  
  const createItem = function (title, url, desc, stars, callback) {
    const newItem = {
      title: title,
      url: url,
      desc: desc,
      stars: stars,
    };

    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newItem),
      success: callback,
    });
  };

  const updateItem = function (id, updateData, callback) {
    $.ajax({
      url: `${BASE_URL}bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback,
    });
  };

  const deleteItem = function (id, callback) {
    $.ajax({
      url: `${BASE_URL}bookmarks/${id}`,
      method: 'DELETE',
      success: callback
    });
  };


  return {
    getItems,
    createItem,
    updateItem,
    deleteItem
  };
}());