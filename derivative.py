import sympy

def ddt(f_x___as_string, with_respect_to="x"):
    if type(f_x___as_string) is not str:
        raise Exception("f_x___as_string must be str but instead is " + str(type(f_x___as_string))) 
    if type(with_respect_to) is not str:
        raise Exception("with_respect_to must be str but instead is " + str(type(with_respect_to))) 
    if len(with_respect_to) != 1:
        raise Exception("len(with_respect_to) must be 1 but is instead " + str(len(with_respect_to))) 
    expression = sympy.sympify(f_x___as_string)
    derivative = sympy.diff(expression, sympy.Symbol(with_respect_to))
    simplified_derivative = sympy.simplify(derivative)
    # print(simplified_derivative)
    # print("")
    print("")
    sympy.pprint(simplified_derivative)
    print("")

# ddt("x**3")
# ddt("(2/x) + (x/2)")
