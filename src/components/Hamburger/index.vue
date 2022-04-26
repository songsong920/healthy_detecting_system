<template>
	<div>
    <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" @click="toggleClick" class="wscn-icon hamburger" :class="{'is-active':isActive}"  >
    <g id="控件" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="top_面包屑" transform="translate(-24.000000, -18.000000)">
            <g id="menu_icon_open">
                <g transform="translate(34.000000, 28.000000) scale(-1, 1) translate(-34.000000, -28.000000) translate(24.000000, 18.000000)">
                    <rect id="Rectangle-9" x="0" y="0" width="20" height="20"></rect>
                    <rect id="Combined-Shape" fill="#666666" x="1.25" y="2.5" width="17.5" height="1.875" rx="0.9375"></rect>
                    <rect id="Rectangle-Copy" fill="#666666" x="1.25" y="9.0625" width="11.25" height="1.875" rx="0.9375"></rect>
                    <path d="M13.0947111,7.8250177 L17.3692475,7.53744049 C17.5414472,7.52585544 17.6904342,7.65605936 17.7020193,7.82825908 C17.7029688,7.8423724 17.7029589,7.85653391 17.7019898,7.87064589 L17.4088387,12.1393768 C17.4029264,12.2254685 17.3283424,12.2904668 17.2422507,12.2845545 C17.2045995,12.2819688 17.1691565,12.2658432 17.1424704,12.2391571 L12.994714,8.09140072 C12.9336946,8.0303813 12.9336946,7.93144927 12.994714,7.87042985 C13.021453,7.84369083 13.0569817,7.82755601 13.0947111,7.8250177 Z" id="Rectangle-6" fill="#666666"></path>
                    <rect id="Rectangle-Copy-2" fill="#666666" x="1.25" y="15.625" width="17.5" height="1.875" rx="0.9375"></rect>
                </g>
            </g>
        </g>
    </g>
</svg>
	</div>
</template>

<script>
  export default {
    name: 'hamburger',
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      toggleClick: {
        type: Function,
        default: null
      }
    }
  }
</script>

<style scoped>
.hamburger {
	display: inline-block;
	cursor: pointer;
	width: 20px;
	height: 20px;
	transform: rotate(180deg);
	transition: .38s;
	transform-origin: 50% 50%;
}

.hamburger.is-active {
	transform: rotate(0deg);
}
</style>
