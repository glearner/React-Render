import ReactReconciler from 'react-reconciler';

let reconciler = ReactReconciler({
    supportsMutation : true,

    createInstance(type,props,rootContainerInstance,hostContext, internalInstanceHandle,){
       let el = document.createElement(type);
       if (props.className) el.className = props.className;
       if (props.src) el.src = props.src;
       if (props.bgColor){
           el.style.backgroundColor = props.bgColor;
       }
       //tags of react element(dom element)
       ['alt','className','href','rel','src','target'].forEach(k=>{
           if(props[k]) el[k] = props[k];
       });
       if(props.onClick){
           el.addEventListener('click',props.onClick);
       }
       return el;
    },
    createTextInstance(text,rootContainerInstance,hostContext,internalInstanceHandle){
        console.log(text)
        return document.createTextNode(text);
    },
    appendChildToContainer(container,child){
        container.appendChild(child)
    },
    appendInitialChild(parent,child){
        parent.appendChild(child)
    },
    commitUpdate(instance,updatePayload,type,oldProps,newProps,finishedWork){},
    finalizeInitialChildren(){},
    getChildHostContext(){},
    getPublicInstance(){},
    getRootHostContext(){},
    prepareForCommit(){},
    resetAfterCommit(){},
    shouldSetTextContent(){
        return false
    },
    removeChildFromContainer(container,child){
        container.removeChild(child)
    },
    removeChild(parent,child){
        parent.removeChild(child)
     },
    insertInContainerBefore(container,child,before){
        container.insertBefore(child,before)
    },
    insertBefore(parent,child,before){
        parent.insertBefore(child,before)
    },
    prepareUpdate(instance,type,oldProps,newProps,rootContainerInstance,currentHostContainer){
        let payload;
        if(oldProps.bgColor !== newProps.bgColor){
            payload = { newBgColor: newProps.bgColor}
        }
        return payload
    },
    commitUpdate(instance,updatePayload,type,oldProps,newProps,finishedWork){
        if(updatePayload.newBgColor){
            instance.style.backgroundColor = updatePayload.newBgColor;
        }
    }

});

let ReactDomMini = {
    render(whatToRender,div){
        let container = reconciler.createContainer(div,false,false); //first false for concurrent and second false for hydration    
        reconciler.updateContainer(whatToRender,container,null,null)
    },
};

export default ReactDomMini;