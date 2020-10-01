import React from 'react'

const withAnimation = WrappedComponent => {
    class _AnimatedComponent extends React.Component {
      state = {
        mount: this.props.mount,
        inProgress: this.props.mount && this.props.animateOnLoad,
        blockAnimation: !this.props.animateOnLoad
      };
  
      static getDerivedStateFromProps(props, state) {
        if (!state.blockAnimation && props.mount !== state.mount) {
          return {
            inProgress: true,
            mount: props.mount
          };
        }
  
        return null;
      }
  
      constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
      }
  
      componentDidMount() {
        this.setState({
          blockAnimation: false
        });
      }
  
      shouldComponentUpdate(nextProps, nextState) {
        return this.state.blockAnimation === nextState.blockAnimation;
      }
  
      onAnimationEnd = event => {
        const { target } = event;
        const { current } = this.wrapperRef;
  
        if (target === current) {
          this.setState({
            inProgress: false
          });
        }
      };
  
      render() {
        const { mount, inProgress, blockAnimation } = this.state;
        const { onMount, onUnmount, defaultClass } = this.props;
        const animationClass = mount ? onMount : onUnmount;
  
        return  (inProgress || mount) ? (
          <div
            ref={this.wrapperRef}
            className={`${defaultClass} ${!blockAnimation ? animationClass : ''}`}
            onAnimationEnd={this.onAnimationEnd}
          >
            <WrappedComponent {...this.props} />
          </div>
        ) : null;
      }
    };
  
    _AnimatedComponent.defaultProps = {
      animateOnLoad: true,
      defaultClass: ''
    };
  
    return _AnimatedComponent;
  };

export default withAnimation;