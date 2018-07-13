/// <reference path="template_run.html" />
///<reference path="handlebars-v3.0.0.js" />
var data;
function randerTemplate(docData) {
    //data = JSON.parse(doc);
	data = docData;
    // Sale Line Table Row Template
    var sale_table_row = $("#sale-line-table-row").html();
    var sale_table_row_template = Handlebars.compile(sale_table_row);
    var size = 0;
    for (var i = 0; i < data.sale_lines.length; i++) {
        if (i == 0) {
            var dh_element = get_doc_header();
            var page_element = get_page();
            var table_element = get_table();
            $(document.body).append(page_element)
            $(page_element).append(dh_element);
            $(page_element).append(table_element);

            size += table_element.height();
            size += dh_element.height();

        }
        Handlebars.registerHelper("index", function () {
            return i + 1;
        });
        var l_html = sale_table_row_template(data.sale_lines[i]);
        var l_element = $(l_html);
        $(table_element).append(l_element);
        size += l_element.height();

        if (i == data.sale_lines.length - 2) {
            var notice_element = get_notice();
            var total_element = get_saleline_total_tfoot();
            size += total_element.height();
            size += 131;
        }
        if (i == data.sale_lines.length - 1) {
            var total_element = get_saleline_total_tfoot();
            var notice_element = get_notice();
            $(table_element).append(total_element);
            $(page_element).append(notice_element);
            size += notice_element.height();
        }

        if (size > maximum_size) {
            size = 0;
            var page_element = get_page();
            var page_break_element = get_pagebreak();
            var table_element = get_table();
            var total_element = get_saleline_total_tfoot();

            if (i != data.sale_lines.length - 1) {
                $(document.body).append(page_break_element);
                $(document.body).append(page_element);
                $(page_element).append(table_element);
            }
            size += table_element.height();
        }
    }
}

//Get page element including page header and footer
function get_page() {
    //Main A4page Template
    var page = $("#page").html();
    var page_template = Handlebars.compile(page);
    var page_context = {};
    var page_html = page_template(page_context);

    // Page Header Template
    var ph = $("#page-header-template").html();
    var ph_template = Handlebars.compile(ph);
    var ph_context = data;
    var ph_html = ph_template(ph_context);

    //Page Footer Template
    var pf = $("#page-footer-template").html();
    var pf_template = Handlebars.compile(pf);
    var pf_context = { footer: "Invoice was created on a computer and is valid without the signature and seal." };
    var pf_html = pf_template(pf_context);

    var ph_element = $(ph_html);
    var pf_element = $(pf_html);
    var page_element = $(page_html);
    $(page_element).append(ph_element);
    $(page_element).append(pf_element);
    return page_element;
}

//Get table element including table head(thead)
function get_table() {
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

    var table_element = $(sale_table_html);
    var thead_element = $(sale_table_head_html);
    $(table_element).append(thead_element);
    return table_element;
}

//Get document header with binded data
function get_doc_header() {
    //Document Header Template
    var dh = $("#document-header-template").html();
    var dh_template = Handlebars.compile(dh);
    var dh_html = dh_template(data);
    var dh_element = $(dh_html);
    return dh_element;
}

//Get page break element
function get_pagebreak() {
    //Page Break
    var page_break = $("#page_break").html();
    var page_break_template = Handlebars.compile(page_break);
    var page_break_context = {};
    var page_break_html = page_break_template(page_break_context);
    var page_break_element = $(page_break_html);

    return page_break_element;
}

// Get sale line total element
function get_saleline_total_tfoot() {
    // Sale Line Table Total Template
    var sale_line_total = $("#sale-line-total").html();
    var sale_line_total_template = Handlebars.compile(sale_line_total);
    var sale_line_total_context = data;
    var sale_line_total_html = sale_line_total_template(data);
    var sale_line_total_element = $(sale_line_total_html);
    return sale_line_total_element;
}

//Get notice element
function get_notice() {
    //Notice Template
    var notice = $("#notices-template").html();
    var notice_template = Handlebars.compile(notice);
    var notice_context = {};
    var notice_html = notice_template(notice_context);
    var notice_element = $(notice_html);

    return notice_element;
}

//Helper method for formatdate 
Handlebars.registerHelper("formatdate", function (timestamp, datetype) {
    if (timestamp != null) {
        var formatted_date = $.datepicker.formatDate('dd - mm - yy', new Date(timestamp));
        return datetype + " : " + formatted_date;
    }
});

//Helper method for theme color
Handlebars.registerHelper("color", function () {
    return theme_color;
});


