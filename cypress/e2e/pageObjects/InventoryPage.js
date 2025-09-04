class InventoryPage {
	//menu
	cartIcon = '[data-icon="shopping-cart"]';
	itemCounterTxt = '.fa-layers-counter';
	inventoryLink = '#inventory_sidebar_link';
	menuIcon = '.bm-burger-button';
	navigationLinks = 'div.bm-menu nav.bm-item-list a';
	productsHeading = '.product_label';
	searchDrpDown = '.product_sort_container';
	logoutBtn = '#logout_sidebar_link';
	

	//cart
	photoImg = '.inventory_item_img';
	titleTxt = '.inventory_item_name';
	descTxt = '.inventory_item_label > .inventory_item_desc';
	priceTxt = '.inventory_item_price';
	addBtn = '.pricebar > .btn_primary';
	checkoutBtn = '.btn_action';


	clickMenuIcon() {
		cy.get(this.menuIcon).click();
	}

	clickLogoutBtn() {
		cy.get(this.logoutBtn).click();
		}
}
export default InventoryPage;