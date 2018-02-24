ROOTDIR=`dirname $0`

DEPLOYDIR=$ROOTDIR/../deploy

if [ ! -f $DEPLOYDIR/bundle.js ]; then
  # Run build
  pushd $ROOTDIR/..
  npm run build
  popd
fi

cp $DEPLOYDIR/bundle.js $DEPLOYDIR/action.js

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
) >> $DEPLOYDIR/action.js

# Create/update an action named `lb-hello`
bx wsk action update lb-hello $DEPLOYDIR/action.js --kind nodejs:8