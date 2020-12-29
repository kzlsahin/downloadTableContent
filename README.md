## Table Content Downloader

This JS script is to be used on a browser console to download contents of a table on a page as a **CSV file**.
As it may be needed to define some functions to get the table content on a page as there may be no way to do this by the user interface of the page.

I have been in need of using codes via console on a page to get the contents of tables as there may not be a default way to do so. One of my tasks under the Ministry of Transport was to take the data of our registered facilities from the tables on a website of a web based application which belongs to the ministry. 
There had been no way to get that data except codding on the console (and may be getting in contact directly with the admins of the server). Then I wrote this script to be usable for different websites and someone may get benefit.

### How to Use

To download the table content on a page, you should call the function downloadTableContent(arg) where arg is an input object.
The function has a default argument object for a default website. When you call the function for the default page, you may call the function without any argument. 

As the default website is a protected app, I prepared a demo argument object for https://www.w3schools.com/html/html_tables.asp. You may open this website, open the console and copy-paste the script onto the console and then, call the function as downloadTableContent(selectorDataSet). 

If you want to use this script on another website content, you should define an object to set the selectorParams like this:

```javascript
{selector_tableParentDiv   : "#jqgrid", 
 selector_totalPagesNum    : "#input_pjqgrid span", 
 selector_currentPageNum   : "#input_pjqgrid input", 
 selector_returnFirstPage  : "#first_pjqgrid", 
 selector_nextPage	        : null, 
 selector_tableRows        : "#customers tbody tr" }
```
the selector parameters are the strings used by JQUERY to select the related HTML elements.

selector_tableParentDiv is the JQuery selector string for 'div' element (may be table etc.) which is the parent of the table;

selector_totalPagesNum is the JQuery selector string for an element that indicates the total number of pages if the table is divided into pages;

selector_currentPageNum is the JQuery selector string for an element that indicates the current page number (pageNumber = element.value);

selector_returnFirstPage is the JQuery selector string for an element that opens the **first** page on click event. **if this is not available, the first page should be openned manually**

selector_nextPage is the JQuery selector string for an element that opens the **next** page on click event. **if this is not available, multipage tables cannot be downloaded**

selector_tableRows is the JQuery selector string for the cell elements of the table (td)

### How to Find Element Identification Attributes?

Most of the websites have complicated tree of HTML elements. Using debugging tools of a browser may be a time consuming process.
So I also added a simple function; findElemAttrs(tag_name)

This function adds a click event listenner to the elements with the input tag name

For example: 

if you call function findElemAttrs("table"),

this will add a event listenner to the all elements of type Table in the page. 
When you click a table, the ID, Class and tagName will be printed on the console

You may use this function to find other elements. Forexample, while working on multi page tables, you may need to find buttons for the next page, the first page, and the indicator node for the current page number.

### Need Help?

You may get in contact with me;

@author: Mustafa SENTURK

@email: mustafa.senturk@yaani.com
