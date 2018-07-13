function rander_template(){

        //Main A4page Template

  var page = $("#page").html();
var page_template = Handlebars.compile(page);
var page_context = {};
var page_html = page_template(page_context);

//Page Break
var page_break = $("#page_break").html();
var page_break_template = Handlebars.compile(page_break);
var page_break_context = {};
var page_break_html = page_break_template(page_break_context);

// Sale Line Table Template
var sale_table = $("#sale-line-table").html();
var sale_table_template = Handlebars.compile(sale_table);
var sale_table_context = {};
var sale_table_html = sale_table_template(sale_table_context);

// Sale Line Table Head Template
var sale_table_head = $("#sale-line-thead").html();
var sale_table_head_template = Handlebars.compile(sale_table_head);
var sale_table_head_context = {};
var sale_table_head_html = sale_table_head_template(sale_table_head_context);

// Sale Line Table Row Head Template
var sale_table_row = $("#sale-line-table-row").html();
var sale_table_row_template = Handlebars.compile(sale_table_row);

// Sale Line Table Head Template
var sale_line_total = $("#sale-line-total").html();
var sale_line_total_template = Handlebars.compile(sale_line_total);
var sale_line_total_context = data;
var sale_line_total_html = sale_line_total_template(data);

// Page Header Template
var ph = $("#page-header-template").html();
var ph_template = Handlebars.compile(ph);
var ph_context = {};
var ph_html = ph_template(ph_context);

//Document Header Template
var dh = $("#document-header-template").html();
var dh_template = Handlebars.compile(dh);

var doc_date = $.datepicker.formatDate('dd - M - yy', new Date(data.document_date));
var delivery_date = $.datepicker.formatDate('dd - M - yy', new Date(data.delivery_date));

/* var dh_context = {
     name: data.customer.name,
     street_address: data.billing_address.street_address,
     phones: data.billing_address.phones,
     number: data.number,
     document_date: doc_date,
     delivery_date:delivery_date
 };*/
var dh_html = dh_template(data);


//Notice Template
var notice = $("#notices-template").html();
var notice_template = Handlebars.compile(notice);
var notice_context = {};
var notice_html = notice_template(notice_context);


//Page Footer Template
var pf = $("#page-footer-template").html();
var pf_template = Handlebars.compile(pf);
var pf_context = { footer: "Invoice was created on a computer and is valid without the signature and seal." };
var pf_html = pf_template(pf_context);

function declare_table_element() {
    var table_element = $(sale_table_html);
    return table_element;
}


var size = 0;
for (var i = 0; i < data.sale_lines.length; i++) {
    if (i == 0) {
        var ph_element = $(ph_html);
        var pf_element = $(pf_html);
        var dh_element = $(dh_html);
        var page_element = $(page_html);
        // var lh_element = $(line_header_html);
        var table_element = $(sale_table_html);
        var thead_element = $(sale_table_head_html);
        $(document.body).append(page_element)
        //$(document.body).append(ph_element)
        //$(document.body).append(dh_element)
        $(page_element).append(ph_element);
        $(page_element).append(pf_element);
        $(page_element).append(dh_element);
        // $(page_element).append(lh_element);
        $(page_element).append(table_element);
        $(table_element).append(thead_element);

        size += table_element.height();
        size += ph_element.height();

    }

    //var l_context = lines[i];
    var l_html = sale_table_row_template(data.sale_lines[i]);
    var l_element = $(l_html);
    $(table_element).append(l_element);
    size += l_element.height();
    if (i == data.sale_lines.length - 1) {
        var total_element = $(sale_line_total_html);
        var notice_element = $(notice_html);
        $(table_element).append(total_element);
        $(page_element).append(notice_element);
    }

    if (size > 300) {

        size = 0;
        var ph_element = $(ph_html);
        var pf_element = $(pf_html);
        var page_element = $(page_html);
        var page_break_element = $(page_break_html)
        var table_element = $(sale_table_html);
        var thead_element = $(sale_table_head_html);
        var total_element = $(sale_line_total_html);
                
        // $(document.body).append(pf_element);
        if (i != data.sale_lines.length - 1) {
            //   $(pf_element).css({ "page-break-after": "always" });
            $(document.body).append(page_break_element);
            $(document.body).append(page_element);
            $(page_element).append(ph_element);
            $(page_element).append(pf_element);
            $(page_element).append(table_element);
            $(table_element).append(thead_element);
                   

        }

        size += table_element.height();
        size += ph_element.height();
    }
}



}

