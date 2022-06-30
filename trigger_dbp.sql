
 drop trigger if exists purchase_update_product;

delimiter //
create trigger purchase_update_product
after update on purchase
for each row
begin
update product set number_in_storehouse = number_in_storehouse - old.all_number + new.all_number 
where product.id = old.product_no;
end //

drop trigger if exists purchase_insert_product;

delimiter //
create trigger purchase_insert_product
after insert on purchase
for each row
begin
update product set number_in_storehouse = number_in_storehouse + new.all_number 
where product.id = new.product_no;
end //

drop trigger if exists purchase_delete_product;

delimiter //
create trigger purchase_delete_product
after delete on purchase
for each row
begin
update product set number_in_storehouse = number_in_storehouse - old.all_number 
where product.id = old.product_no;
end //


drop trigger if exists shipment_update_product;

delimiter //
create trigger shipment_update_product
after update on shipment
for each row
begin
update product set number_in_storehouse = number_in_storehouse + old.all_number - new.all_number 
where product.id = old.product_no;
update product set number_in_shop = number_in_shop - old.all_number + new.all_number 
where product.id = old.product_no;
end //

drop trigger if exists shipment_insert_product;

delimiter //
create trigger shipment_insert_product
after insert on shipment
for each row
begin
update product set number_in_storehouse = number_in_storehouse - new.all_number 
where product.id = new.product_no;
update product set number_in_shop = number_in_shop + new.all_number 
where product.id = new.product_no;
end //

drop trigger if exists shipment_delete_product;

delimiter //
create trigger shipment_delete_product
after delete on shipment
for each row
begin
update product set number_in_storehouse = number_in_storehouse + old.all_number 
where product.id = old.product_no;
update product set number_in_shop = number_in_shop - old.all_number 
where product.id = old.product_no;
end //

drop trigger if exists product_insert;

delimiter //
create trigger product_insert
before insert on product
for each row
begin
	if 
		new.number_in_shop != 0 
	then
		set new.number_in_shop = 0 ;
	end if;
    if 
		new.number_in_storehouse != 0
	then
		set new.number_in_storehouse = 0 ;
	end if;
end//


drop trigger if exists pr_update_product;

delimiter //
create trigger pr_update_product
after update on product_record
for each row
begin
update product set number_in_shop = number_in_shop - new.num + old.num
where product.id = new.product_no;
end //

drop trigger if exists pr_insert_product;

delimiter //
create trigger pr_insert_product
after insert on product_record
for each row
begin
update product set number_in_shop = number_in_shop - new.num
where product.id = new.product_no;
end //

drop trigger if exists pr_delete_product;

delimiter //
create trigger pr_delete_product
after delete on product_record
for each row
begin
update product set number_in_shop = number_in_shop + old.num
where product.id = old.product_no;
end //