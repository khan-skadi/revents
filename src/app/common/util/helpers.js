export const createNewEvent = (user, photoURL, event) => {
  return {
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: photoURL || '/assets/user.png',
    createdAt: new Date(),
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: new Date(),
        photoURL: photoURL || '/assets/user.png',
        displayName: user.displayName,
        host: true
      } // this is the shape of object we will send to firestore
    }
  };
};

export const objectToArray = object => {
  if (object) {
    return Object.entries(object).map(e =>
      Object.assign({}, e[1], { id: e[0] })
    );
  }
};

export const createDataTree = dataset => {
  let hashTable = Object.create(null);
  dataset.forEach(a => (hashTable[a.id] = { ...a, childNodes: [] }));
  let dataTree = [];
  dataset.forEach(a => {
    if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
    else dataTree.push(hashTable[a.id]);
  });
  return dataTree;
};
