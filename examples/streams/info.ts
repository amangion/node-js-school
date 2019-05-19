  //
  //
  // readableSrc
  //   .pipe(transformStream1)
  //   .pipe(transformStream2)
  //   .pipe(finalWrtitableDest)
  //
  //
  //
  // a.pipe(b).pipe(c).pipe(d)
  //
  // a.pipe(b)
  // b.pipe(c)
  // c.pipe(d)
  //
  //  Which, in Linux, is equivalent to:
  //     $ a | b | c | d
  //
  //
  //   readable.pipe(writable)
  //
  //   readable.on('data', (chunk) => {
  //       writable.write(chunk);
  //   });
  //
  //   readable.on('end', () => {
  //       writable.end();
  //   });
