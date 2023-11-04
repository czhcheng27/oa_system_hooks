export const projectTypes = [
  { label: '整车', value: '01' },
  { label: '动总', value: '02' },
];

export const viewTypes = [
  { label: '项目当前状态', value: '02' },
  { label: '项目完整周期', value: '01' },
];

export const initCensusData = {
  totalProject: 0,
  annualNode: 0,
  isCurrentPlan: 0,
  isFinishShow: 0,
  isOverTime: 0,
  monthNodes: {
    isCurrentMonthFinish: 0,
    isCurrentMonth: 0,
  },
  isNextMonth: 0,
  finishRate: '0%',
};

export const pscNodeOpts = [
  {
    label: '项目总数',
    code: 'totalProject',
    totalProject: 0,
  },
  {
    label: '年度节点',
    code: 'annualNode',
  },
  {
    label: '当前计划',
    code: 'isCurrentPlan',
  },
  {
    label: '已完成',
    code: 'isFinishShow',
  },
  {
    label: '已逾期',
    code: 'isOverTime',
  },
  {
    label: '本月节点',
    code: 'monthNodes',
  },
  {
    label: '下月节点',
    code: 'isNextMonth',
  },
  {
    label: '完成率',
    code: 'finishRate',
  },
];

// nodeStatus，01：绿底白边；02：绿底红边；03：红底白边；05：浅蓝白边；06：深蓝白边；07：灰底白边；
// nodeStatus，0101: 绿底白边椭圆；0102：绿底白边方块；0201：绿底红边椭圆；0202：绿底红边方块；0301：红底白边椭圆；0302：红底白边方块；0601：蓝底白边椭圆；0602：蓝底白边方块；0701：灰色白边椭圆；0702：灰色白边方块
// 小人在当前节点前面
export const pscFullNodeCenter = {
  '01': {
    backgroundColor: '#1AC398',
    border: '1px solid #ffffff',
  },
  '02': {
    backgroundColor: '#1AC398',
    border: '1px solid #FF5219',
  },
  '03': {
    backgroundColor: '#FF5219',
    border: '1px solid #ffffff',
  },
  '05': {
    backgroundColor: '#74bfff',
    border: '1px solid #ffffff',
  },
  '06': {
    backgroundColor: '#0089FF',
    border: '1px solid #ffffff',
  },
  '07': {
    backgroundColor: '#b1b6c7',
    border: '1px solid #ffffff',
  },
  '0101': {
    backgroundColor: '#1AC398',
    border: '1px solid #ffffff',
    borderRadius: '10px',
  },
  '0102': {
    backgroundColor: '#1AC398',
    border: '1px solid #ffffff',
  },
  '0201': {
    backgroundColor: '#1AC398',
    border: '1px solid #FF5219',
    borderRadius: '10px',
  },
  '0202': {
    backgroundColor: '#1AC398',
    border: '1px solid #FF5219',
  },
  '0301': {
    backgroundColor: '#FF5219',
    border: '1px solid #ffffff',
    borderRadius: '10px',
  },
  '0302': {
    backgroundColor: '#FF5219',
    border: '1px solid #ffffff',
  },
  '0501': {
    backgroundColor: '#74BFFF',
    border: '1px solid #ffffff',
    borderRadius: '10px',
  },
  '0502': {
    backgroundColor: '#74BFFF',
    border: '1px solid #ffffff',
  },
  '0601': {
    backgroundColor: '#0089FF',
    border: '1px solid #ffffff',
    borderRadius: '10px',
  },
  '0602': {
    backgroundColor: '#0089FF',
    border: '1px solid #ffffff',
  },
  '0701': {
    backgroundColor: '#b1b6c7',
    border: '1px solid #ffffff',
    borderRadius: '10px',
  },
  '0702': {
    backgroundColor: '#b1b6c7',
    border: '1px solid #ffffff',
  },
};
