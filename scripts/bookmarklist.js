'use strict';
/* global store store, api */
// eslint-disable-next-line no-unused-vars

const bookmarks = (function(){

  function generateItemElement(item) {
    let itemTitle = `<span class="bookmark-title">${item.title}</span>`;
    let itemDescription = `<span class="description">${item.description}</span>`;
    let itemStars = `<span>${item.stars}/5 stars</span>`;
    let itemURL = `<a href="${item.URL}"><button type="submit">Visit Site</button></a>`;
    let editButton  = '<button type="submit" class="bookmark-edit">Edit Bookmark</button>';
    let deleteButton = '<button type="submit" class="bookmark-delete">Delete Bookmark</button>';
    if (item.edit) {
      itemTitle = `
        <form id="bookmark-edit-item">
          <input class="bookmark-edit-title" type="text" value="${item.title}" />
        </form>
      `;
      itemDescription = `<textarea class="description">${item.description}</textarea>`;
      itemStars = `
        <select class="edit-star">
          <option value="1">1-star</option>
          <option value="2">2-star</option>
          <option value="3">3-star</option>
          <option value="4">4-star</option>
          <option value="5">5-star</option>
        </select>
      `;
      itemURL = `
        <input class="bookmark-edit-URL" type="text" value="${item.URL}" />
      `; 
      editButton = `
      <button type="submit" class="save-edit">Save Changes</button>
    `;
      deleteButton = `
      <button type="submit" class="undo-edit">Undo Changes</button>
    `;
    }

    return `
  <li class="bookmark" data-item-id="${item.id}">
    ${itemTitle}
    <div class="stars">
    ${itemStars}
    </div>
    <div class="openTab" id="${item.id}">
    ${itemDescription}
      <div class="bookmark-buttons">
        ${editButton}
        ${deleteButton}
        ${itemURL}
      </div>
    </div>
  </li>
  `;
  }

  function generateBookmarkItemsString(bookmarks) {
    const items = bookmarks.map((item) => generateItemElement(item));
    return items.join('');
  }

  function generateNewItem() {
    $('.bookmark-add').click(function() {
      event.preventDefault();
      let addItemPage = `
    <li>
      <form>
        <input class="bookmark-edit" type="text" placeholder="Enter a Title" />
        <select class="add-star">
          <option value="1">1-star</option>
          <option value="2">2-star</option>
          <option value="3">3-star</option>
          <option value="4">4-star</option>
          <option value="5">5-star</option>
        </select>
        <textarea class="description" placeholder="Enter a Description"></textarea>
        <input type="text" class="add-URL" placeholder="Enter a URL"></input>
        <button type="button" class="add-bookmark">Add Bookmark</button>
      </form>
    </li>
    `;
      $('.bookmark-list').html(addItemPage);
    });
  }

  function addItem() {
    $('.bookmark-list').on('click', '.add-bookmark', event => {
      event.preventDefault();
      const title = $('.bookmark-edit').val();
      const description = $('.description').val();
      const stars = $('.add-star').val();
      const URL = $('.add-URL').val();
      store.addItem(title, description, stars, URL);
      render();
    });
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.bookmark')
      .data('item-id');
  }

  function expandItem() {
    $('.bookmark-list').on('click', '.bookmark-title', event => {
      const id = getItemIdFromElement(event.currentTarget);
      $(`#${id}`).slideToggle();
    });
  }

  function bookmarkEditItem() {
    $('.bookmark-list').on('click', '.bookmark-edit', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      store.turnOffEdit();
      store.toggleEdit(id);
      render();
      $(`#${id}`).show();
    });
  }


  function saveChanges() {
    $('.bookmark-list').on('click', '.save-edit', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const title = $('.bookmark-edit-title').val();
      const description = $('.description').val();
      const stars = $('.edit-star').val();
      const URL = $('.bookmark-edit-URL').val();
      store.findAndUpdateItem(id, title, description, stars, URL);
      store.toggleEdit(id);
      render();
      $(`#${id}`).show();
    });
  }

  function undoChanges() {
    $('.bookmark-list').on('click', '.undo-edit', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      store.turnOffEdit();
      render();
      $(`#${id}`).show();
    });
  }


  function deleteItemClicked() {
  // like in `handleItemCheckClicked`, we use event delegation
    $('.bookmark-list').on('click', '.bookmark-delete', event => {
    // get the index of the item in store.items
      const id = getItemIdFromElement(event.currentTarget);
      // delete the item
      store.findAndDelete(id);
      // render the updated shopping list
      render();

    });
  }

  function starFilter() {
    $('.stars').change(function() {
      render();
    });
  }

  function render() {
  // Filter item list if store prop is true by item.checked === false
    let items = store.items;

    items = store.items.filter(item => item.stars >= $('.stars').val());


    console.log('`render` ran');
    const bookmarkItemsString = generateBookmarkItemsString(items);

    // insert that HTML into the DOM
    $('.bookmark-list').html(bookmarkItemsString);
  }

  function bindEventListeners() {
    expandItem();
    bookmarkEditItem();
    deleteItemClicked();
    generateNewItem();
    addItem();
    saveChanges();
    undoChanges();
    starFilter();
  }

  return {
    render,
    bindEventListeners,
  };
}() );
// 'use strict';
// const shoppingList = (function(){

//   function generateItemElement(item) {
//     let itemTitle = `<span class="shopping-item shopping-item__checked">${item.name}</span>`;
//     if (!item.checked) {
//       itemTitle = `
//         <form id="js-edit-item">
//           <input class="shopping-item type="text" value="${item.name}" />
//         </form>
//       `;
//     }
  
//     return `
//       <li class="js-item-element" data-item-id="${item.id}">
//         ${itemTitle}
//         <div class="shopping-item-controls">
//           <button class="shopping-item-toggle js-item-toggle">
//             <span class="button-label">check</span>
//           </button>
//           <button class="shopping-item-delete js-item-delete">
//             <span class="button-label">delete</span>
//           </button>
//         </div>
//       </li>`;
//   }
  
  
//   function generateShoppingItemsString(shoppingList) {
//     const items = shoppingList.map((item) => generateItemElement(item));
//     return items.join('');
//   }
  
  
//   function render() {
//     // Filter item list if store prop is true by item.checked === false
//     let items = store.items;
//     if (store.hideCheckedItems) {
//       items = store.items.filter(item => !item.checked);
//     }
  
//     // Filter item list if store prop `searchTerm` is not empty
//     if (store.searchTerm) {
//       items = store.items.filter(item => item.name.includes(store.searchTerm));
//     }
  
//     // render the shopping list in the DOM
//     console.log('`render` ran');
//     const shoppingListItemsString = generateShoppingItemsString(items);
  
//     // insert that HTML into the DOM
//     $('.js-shopping-list').html(shoppingListItemsString);
//   }
  
  
//   function handleNewItemSubmit() {
//     $('#js-shopping-list-form').submit(function (event) {
//       event.preventDefault();
//       const newItemName = $('.js-shopping-list-entry').val();
//       $('.js-shopping-list-entry').val('');
//       api.createItem(newItemName, (newItem) => {
//         store.addItem(newItem);
//         render();
//       }); 
//     });
//   }
  
//   function getItemIdFromElement(item) {
//     return $(item)
//       .closest('.js-item-element')
//       .data('item-id');
//   }
  
//   function handleItemCheckClicked() {
//     $('.js-shopping-list').on('click', '.js-item-toggle', event => {
//       const id = getItemIdFromElement(event.currentTarget);
//       store.findAndToggleChecked(id);
//       render();
//     });
//   }
  
//   function handleDeleteItemClicked() {
//     // like in `handleItemCheckClicked`, we use event delegation
//     $('.js-shopping-list').on('click', '.js-item-delete', event => {
//       // get the index of the item in store.items
//       const id = getItemIdFromElement(event.currentTarget);
//       // delete the item
//       store.findAndDelete(id);
//       // render the updated shopping list
//       render();
//     });
//   }
  
//   function handleEditShoppingItemSubmit() {
//     $('.js-shopping-list').on('submit', '#js-edit-item', event => {
//       event.preventDefault();
//       const id = getItemIdFromElement(event.currentTarget);
//       const itemName = $(event.currentTarget).find('.shopping-item').val();
//       store.findAndUpdateName(id, itemName);
//       render();
//     });
//   }
  
//   function handleToggleFilterClick() {
//     $('.js-filter-checked').click(() => {
//       store.toggleCheckedFilter();
//       render();
//     });
//   }
  
//   function handleShoppingListSearch() {
//     $('.js-shopping-list-search-entry').on('keyup', event => {
//       const val = $(event.currentTarget).val();
//       store.setSearchTerm(val);
//       render();
//     });
//   }
  
//   function bindEventListeners() {
//     handleNewItemSubmit();
//     handleItemCheckClicked();
//     handleDeleteItemClicked();
//     handleEditShoppingItemSubmit();
//     handleToggleFilterClick();
//     handleShoppingListSearch();
//   }

//   // This object contains the only exposed methods from this module:
//   return {
//     render: render,
//     bindEventListeners: bindEventListeners,
//   };
// }());
