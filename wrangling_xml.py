import xml.etree.ElementTree as ET

'''
xml_data = """
<root>
    <a>
        <alpha>Value1</alpha>
    </a>
    <b>
        <beta0>Value2</beta0>
        <beta1>
            <first_of_beta1>Value3</first_of_beta1>
            <second_of_beta1>Value4</second_of_beta1>
            <third_of_beta1>Value5</third_of_beta1>
            <fourth_of_beta1>Value6</fourth_of_beta1>
        </beta1>
    </b>
    <c>
        <gamma>Value7</gamma>
    </c>
</root>
"""

test2 = """
<mysqldump xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	<database name="osat_prd">
		...
		<table_structure name="tool_data_cache">
			<field Field="id" Type="bigint" Null="NO" Key="PRI" Extra="" Comment="" />
			<field Field="public_question_answers" Type="json" Null="NO" Key="" Extra="" Comment="" />
			<field Field="public_question_answers_structured" Type="json" Null="NO" Key="" Extra="" Comment="" />
			<field Field="public_question_answers_sort" Type="json" Null="NO" Key="" Extra="" Comment="" />
			<field Field="private_question_answers" Type="json" Null="NO" Key="" Extra="" Comment="" />
			<field Field="private_question_answers_structured" Type="json" Null="NO" Key="" Extra="" Comment="" />
			<field Field="private_question_answers_sort" Type="json" Null="NO" Key="" Extra="" Comment="" />
			<field Field="derived_fields" Type="json" Null="NO" Key="" Extra="" Comment="" />
			<field Field="derived_fields_structured" Type="json" Null="NO" Key="" Extra="" Comment="" />
			<field Field="derived_fieldsroot_sort" Type="json" Null="NO" Key="" Extra="" Comment="" />
			<field Field="combined_fields" Type="json" Null="NO" Key="" Extra="" Comment="" />
			<field Field="combined_fields_structured" Type="json" Null="NO" Key="" Extra="" Comment="" />
			<field Field="combined_fields_sort" Type="json" Null="NO" Key="" Extra="" Comment="" />
			<key Table="tool_data_cache" Non_unique="0" Key_name="PRIMARY" Seq_in_index="1" Column_name="id" Collation="A" Cardinality="463" Null="" Index_type="BTREE" Comment="" Index_comment="" Visible="YES" />
			<options Name="tool_data_cache" Engine="InnoDB" Version="10" Row_format="Dynamic" Rows="463" Avg_row_length="69110" Data_length="31997952" Max_data_length="0" Index_length="0" Data_free="5242880" Create_time="2023-11-28 18:36:54" Update_time="2025-05-13 19:19:01" Collation="utf8mb4_0900_ai_ci" Create_options="" Comment="" />
		</table_structure>
		<table_data name="tool_data_cache">
			<row>
				<field name="id">1</field>
				<field name="public_question_answers">
					{&quot;tool_name&quot;: &quot;20 Watersheds Streamflow and Water Quality Projections&quot; ... }
				</field>
				<field name="public_question_answers_structured">	... </field>
				<field name="public_question_answers_sort">			... </field>
				<field name="private_question_answers">				... </field>
				<field name="private_question_answers_structured">	... </field>
				<field name="private_question_answers_sort">		... </field>
				<field name="derived_fields">						... </field>
				<field name="derived_fields_structured">			... </field>
				<field name="derived_fields_sort">					... </field>
				<field name="combined_fields">						... </field>
				<field name="combined_fields_structured">			... </field>
				<field name="combined_fields_sort">					... </field>
			</row>
			...
		</table_data>
	</database>
</mysqldump>
"""
'''

def print_tree(element, n=2, printAllAttributes=False, depth=0): # n = max_number_of_children_at_each_depth_I_want_printed
    branchVisual = "    "
    leafVisual   = "____"
    number_of_children_at_this_depth = 0
    if element.get("name") is not None:
        name = element.get("name")
    else:
        name = ""
    def printComplete(element, indexOfThisElement, depth, howManySpacesItTookToPrintTheIndexOfThePreviousElement, Name=name):
        if Name is None:
            Name = ""
        if depth > 1:
            print((" "*int(howManySpacesItTookToPrintTheIndexOfThePreviousElement+1)) + (branchVisual*depth) + leafVisual + "[" + str(indexOfThisElement) + "] " + element.tag + " " + Name) 
            if printAllAttributes:
                for I in element.items():
                    print((" "*int(howManySpacesItTookToPrintTheIndexOfThePreviousElement+1)) + (branchVisual*depth) + branchVisual + "'" + I[0] + "' = " + "'" + I[1] + "'") 
                    #print((" "*int(howManySpacesItTookToPrintTheIndexOfThePreviousElement+1)) + (branchVisual*depth) + leafVisual + '"' + I[0] + '" = ' + '"' + I[1] + '"') 
        else:
            print((branchVisual*depth) + leafVisual + "[" + str(indexOfThisElement) + "] " + element.tag + " " + Name) 
            if printAllAttributes:
                for I in element.items():
                    print((" "*int(howManySpacesItTookToPrintTheIndexOfThePreviousElement+1)) + (branchVisual*depth) + branchVisual + "'" + I[0] + "' = " + "'" + I[1] + "'") 
                    #print((" "*int(howManySpacesItTookToPrintTheIndexOfThePreviousElement+1)) + (branchVisual*depth) + leafVisual + '"' + I[0] + '" =   ' + '"' + I[1] + '"') 
    if depth == 0:
        print(element.tag + " " + name)
    if len(list(element)) != 0:
        for child in element:
            number_of_children_at_this_depth += 1
        if number_of_children_at_this_depth > n:
            print((branchVisual*(depth+2)) +(" "*len("[0] ")) + leafVisual + f" [number of children at this depth = {number_of_children_at_this_depth}]") 
        else:
            indexOfThisChild = 0
            for child in element:
                howManySpacesItTakesToPrintTheIndexOfThisChild = len("[") + len(str(indexOfThisChild)) + len("]")
                printComplete(child, indexOfThisChild, depth+1, howManySpacesItTakesToPrintTheIndexOfThisChild, child.get("name"))
                print_tree(child, n, printAllAttributes, depth+1)
                indexOfThisChild += 1

print_tree(r[66], 15, True)
print_tree(r[66], 15)

# root = ET.fromstring(test2)
# print_tree(root, 3)
# print_tree(root, 4)

def text(element, n = 10):
    if element.get("name") is None:
       print("` NoneType `")
       print("")
    else:
        print("`" + element.get("name") + "`")
    if type(element.text) is str:
        print(element.text)
        print("")
    number_of_children = 0
    for item in element:
        number_of_children += 1
        if number_of_children > n:
            print("number of children = {number_of_children}")
        else:
            text(item)
