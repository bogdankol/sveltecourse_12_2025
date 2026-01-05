<script lang="ts">
	
  const targetObj = {
    firstName: 'bohdan',
    lastName: 'kol',
    get fullName() {
      return `${this.firstName} ${this.lastName}`
    },
    occupations: [],
    set occupation(value: string) {
      this.occupations.push(value)
    }
  }

  targetObj.firstName = 'bohdan2'
  targetObj.occupation = 'occup1'
  // console.log({targetObj})

  const handlersObj = {
    get(target: any, prop: any) {
      console.log({target, prop})
      this.check(target, prop)
      return target[prop]
    },
    set(target: any, prop: any, value: any) {
      this.check(target, prop)
      target[prop] = value
      return true
    },
    check(target: any, prop: any) {
      if(!target[prop]) throw Error('No such prop in object')
    }
  }

  const proxyObj = new Proxy(targetObj, handlersObj)

  proxyObj.firstName = 'asdasd'
  console.log(proxyObj)

</script>
