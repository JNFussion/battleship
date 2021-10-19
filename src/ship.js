const shipFactory = (size) => {
  if (![2, 3, 4, 5].includes(size)) {
    throw RangeError("Invalid Size");
  }

  const body = Array(size).fill(false);

  const hit = (pos = 0) => {
    if (pos < 0 || pos >= body.length) {
      return false;
    }
    if (body[pos] === true) {
      return false;
    }

    body[pos] = true;
    return body[pos];
  };

  const isSunk = () => body.every((val) => val);

  return { size, hit, isSunk };
};

export default shipFactory;
