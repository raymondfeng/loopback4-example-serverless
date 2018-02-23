ROOTDIR=`dirname $0`

WEBPACKDIR=$ROOTDIR/../webpack

if [ ! -f $WEBPACKDIR/bundle.js ]; then
  # Run build
  pushd $ROOTDIR/..
  npm run build
  popd
fi

cp $WEBPACKDIR/bundle.js $WEBPACKDIR/action.js

# Add the main function to the webpack bundle
(cat <<MAIN_FUNCTION

/**
 * Main entry for open-whisk action
 */
async function main(params) {
  const command = params.command || 'hello';
  const message = await exports.invokeAction(command, params);
  return {message};
}

MAIN_FUNCTION
) >> $WEBPACKDIR/action.js

# Create/update an action named `lb-hello`
bx wsk action update lb-hello $WEBPACKDIR/action.js --kind nodejs:8