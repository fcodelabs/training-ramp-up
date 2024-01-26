/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    temp=[];
    nums1index=0;
    nums2index=0;
    for(let i=0; i<=m+n; i++){
       if (nums1index>m){
           temp.push(nums2[nums2index])
           nums2index++
       }
       if (nums1[nums1index]< nums2[nums2index]){
           temp.push(nums1[nums1index])
           nums1index++
       }
       else if (nums1[nums1index]>= nums2[nums2index]){
           temp.push(nums2[nums2index])
           nums2index++
       }
    }
    nums1= temp
    return temp
    
  };