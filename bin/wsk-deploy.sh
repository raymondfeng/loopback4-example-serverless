ROOTDIR=`dirname $0`
DEPLOYDIR=$ROOTDIR/../deploy

rm -rf $DEPLOYDIR/package
mkdir -p $DEPLOYDIR/package
cp -r package.json index.js dist $DEPLOYDIR/package
pushd $DEPLOYDIR/package
npm install --only=production 
zip -rq code.zip package.json index.js dist node_modules
popd

bx wsk action update lb-hello --kind nodejs:8 $DEPLOYDIR/package/code.zip