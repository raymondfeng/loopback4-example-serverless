ROOTDIR=`dirname $0`/..
DEPLOYDIR=$ROOTDIR/deploy
PKGDIR=$DEPLOYDIR/package

pushd $ROOTDIR >/dev/null
npm run clean && npm run build
mkdir -p $PKGDIR
cp -r package.json index.js dist $PKGDIR >/dev/null
popd >/dev/null

pushd $PKGDIR >/dev/null
npm install --only=production
zip -rq code.zip package.json index.js dist node_modules
popd >/dev/null

bx wsk action update lb-hello --kind nodejs:8 $PKGDIR/code.zip