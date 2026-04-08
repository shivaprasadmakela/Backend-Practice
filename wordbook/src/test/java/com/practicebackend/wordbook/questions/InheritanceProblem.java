package com.practicebackend.wordbook.questions;

import java.util.ArrayList;

public class InheritanceProblem<T> extends ArrayList<T> {

    public T getSecondEle(){
        if (this.size() < 2) {
            return null;
        }
        return super.get(1);
    }

    @Override
    public T get(int index){
        return super.get(index);  // Fixed: use index parameter
    }

    @Override
    public T remove(int index){
        if (index < 0 || index >= this.size()) {
            return null;
        }

        if (super.get(index) instanceof Integer) {
            if (((Integer) super.get(index)) % 2 == 0) {
                return super.remove(index);
            }
        }
        return null;
    }
}