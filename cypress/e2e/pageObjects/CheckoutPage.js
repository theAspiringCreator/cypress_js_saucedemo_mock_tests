class CheckoutPage {
	//invoice info
	firstNameTxt = '.checkout_info > #first-name';
	lastNameTxt = '.checkout_info > #last-name';
	zipTxt = '.checkout_info > #postal-code';
	
	continueBtn ='.cart_button';
	quantityHdrTxt ='.cart_quantity_label';
	descTblHdrTxt = '.cart_desc_label';
	itemNameTxt = '.inventory_item_name';
	itemDescTxt = '.inventory_item_desc';
	itemPriceTxt = '.inventory_item_price';

                           
	firstItemPriceTxt = ':nth-child(3) > .cart_item_label > .inventory_item_price';
	secondItemPriceTxt =':nth-child(4) > .cart_item_label > .inventory_item_price';

	


	overviewTxt = '.page_wrapper > #contents_wrapper > .subheader';
	paymentTxt = '.summary_info > :nth-child(1)';
	invoiceNoTxt = '.summary_info > :nth-child(2)';
	shippingTxt = '.summary_info > :nth-child(3)';
	invoiceHeadingTxt = '.summary_info > :nth-child(4)';
	itemTotalTxt = '.summary_subtotal_label';
	taxTxt = '.summary_tax_label';
	totalTxt = '.summary_total_label';

	cancelBtn = '.cart_footer > a:first-child';
	finishBtn ='.btn_action';
}

export default CheckoutPage;