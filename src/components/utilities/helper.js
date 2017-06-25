export const setDashOnNull = (value) => {
  const result = (value) || '-';
  return result;
};

export const closeMarkerInfo = (pumpDetails) => {
  const data = pumpDetails.map((pumpInfo) => {
    pumpInfo.isMarkerOpen = false;
    return pumpInfo;
  });
  return data;
};
