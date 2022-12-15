export class Vector {
  /**
   * 벡터 정규화
   * @param vec 
   * @returns Number[]
   */
  static normalize(vec: any[]) {
    const mag = Vector.getMagnitude(vec)
    return vec.map((item) => {
      return item / mag
    })
  }

   /**
   * 내적: Math.abs(1)인 경우 평행 -1일때 반대방향을 향하고 1일때 같은 방향을 향한다
   * @param vec 
   * @param vec2 
   * @returns Number
   */
  static dotProduct(vec: any[], vec2: any[]) {
    const added = vec
      .map((item, index) => {
        return item * vec2[index]
      })
      .map((item) => item)
    return added.reduce((prev, curr) => {
      return prev + curr
    }, 0)
  }

  /**
   * 외적: 두 벡터와 직교하는 벡터(노말)
   * @param vec 
   * @param vec2 
   * @returns Number[]
   */
  static vectorProduct(vec: any[], vec2: any[]) {
    // A (x, y, z)
    // B (x, y, z)
    // Cx = (Ay * Bz) - (Az * By)
    // Cy = (Az * Bx) - (Ax * Bz) *** x,y,z,x,y,z,x...
    // Cz = (Ax * By) - (Ay * Bx)
    const cx = vec[1] * vec2[2] - vec[2] * vec2[1]
    const cy = vec[2] * vec2[0] - vec[0] * vec2[2]
    const cz = vec[0] * vec2[1] - vec[1] * vec2[0]
    return [cx, cy, cz]
  }

  /**
   * 벡터의 크기
   * @param vec
   * @returns Number
   */
  static getMagnitude(vec: any[]) {
    const sum = vec.reduce((prev, curr) => {
      return prev + Math.pow(curr, 2)
    }, 0)
    return Math.sqrt(sum)
  }

  /**
   * 벡터의 비교 => 단순 비교인 경우
   * @param vec
   * @returns Number
   */
  static compareMagnitude(vec1: any[], comparison: any[]) {
    const sum1 = vec1.reduce((prev, curr) => {
      return prev + Math.pow(curr, 2)
    }, 0)
    const sum2 = comparison.reduce((prev, curr) => {
      return prev + Math.pow(curr, 2)
    }, 0)
    return sum1 > sum2 ? true : false
  }

  /**
   * 두 벡터간의 각 크기, 방향X *
   * @param {*} vec
   * @param {*} vec2
   * @returns Number
   */
  static getAngle(vec: any[], vec2: any[]) {
    return Math.acos(
      Vector.dotProduct(vec, vec2) /
        (Vector.getMagnitude(vec) * Vector.getMagnitude(vec2))
    )
  }

  static getReflectVec(vec: any[], normal: any[]) {
    const vec1 = vec.map((item) => item * -2)
    const normalVec = normal.map((item) => item * 2)
    const first = Vector.dotProduct(vec1, normalVec)
    return normal.map((item, index) => item * first + vec[index])
  }

  static getProjection(vec: any[], normal: any[], acceleration = 1) {
    const first =
      Vector.dotProduct(vec, normal) / Math.pow(Vector.getMagnitude(normal), 2)
    const second = normal.map((item) => item * first)
    const thrid = vec.map((item, index) => item - second[index])
    return thrid.map((item) => item * acceleration)
  }

  /**
   * 행렬 판별식
   * @param {*} mat
   * @returns Nubmer
   */
  static det(mat: any[]) {
    // 2x2 mat
    if (mat?.length !== mat[0]?.length)
      return console.error('Can not determine the matrix!')
    if (mat?.length === 2 && mat[0]?.length === 2 && mat[1].length === 2) {
      return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0]
    }
    let res = 0
    for (let i in mat[0]) {
      const index = parseInt(i)
      const arr = mat.slice(1).map((item) => {
        return [...item.slice(0, index), ...item.slice(index + 1)]
      })
      const cal = mat[0][i] * (Vector.det(arr) as any)
      if (index % 2 === 1) {
        res -= cal
      } else {
        res += cal
      }
    }
    return res
  }

  /**
   * Radian => Degree
   * @param {*} rad
   * @returns Number
   */
  static radToDegree(rad: number) {
    return rad * (Math.PI / 180);
  }

  /**
   * Degree => Radian
   * @param {*} rad
   * @returns Number
   */
  static degreeToRad(degree: number) {
    return degree * (180 / Math.PI);
  }

  /**
   * 점과 점사이의 각도, 방향(0 ~ 360 deg)
   * @param {*} x (b.x - a.x)
   * @param {*} y (b.y - a.y)
   * @param {*} isDegree 각도 단위변환
   * @returns Number
   */
  static absAngle(x: number, y: number, isDegree = false) {
    if (!isDegree) return Math.atan2(y, x)
    else return Vector.radToDegree(Math.atan2(y, x))
  }
}
