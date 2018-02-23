# Invoke `ServerlessController.hello('Raymond')`
bx wsk action invoke --blocking --result lb-hello -p name Raymond
# Invoke `ServerlessController.helloWorld()`
bx wsk action invoke --blocking --result lb-hello -p command helloWorld
# Invoke `ServerlessController.helloAsync(1)`
bx wsk action invoke --blocking lb-hello -p command greet -p id 1